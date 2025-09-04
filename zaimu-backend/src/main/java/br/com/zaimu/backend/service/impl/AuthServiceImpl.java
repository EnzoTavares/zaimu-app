package br.com.zaimu.backend.service.impl;

import br.com.zaimu.backend.model.entity.User;
import br.com.zaimu.backend.model.security.LoginResponseView;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.ConfirmEmailParameters;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.model.to.UserView;
import br.com.zaimu.backend.repository.hibernate.UserRepository;
import br.com.zaimu.backend.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthFlowType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthenticationResultType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ConfirmForgotPasswordRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ConfirmSignUpRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ForgotPasswordRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ForgotPasswordResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.InitiateAuthRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.InitiateAuthResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ResendConfirmationCodeRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ResendConfirmationCodeResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.SignUpRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.SignUpResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UsernameExistsException;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl extends RequestUser implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    private final CognitoIdentityProviderClient cognitoClient;

    @Value("${aws.cognito.client-id}")
    private String clientId;

    @Value ("${aws.cognito.user-pool-id}")
    private String userPoolId;

    @Value("${aws.region}")
    private String region;

    @Value("${LAMBDA_FUNCTION_NAME}")
    private String functionName;

    public AuthServiceImpl(@Value("${aws.region}") String reg) {
        this.cognitoClient = CognitoIdentityProviderClient.builder()
                .region(Region.of(reg))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();

        Dotenv dotenv = Dotenv.load();
        System.setProperty("aws.accessKeyId", dotenv.get("AWS_ACCESS_KEY_ID"));
        System.setProperty("aws.secretAccessKey", dotenv.get("AWS_SECRET_ACCESS_KEY"));
        System.setProperty("aws.region", dotenv.get("AWS_REGION"));
    }

    public RequestUser signUpUser (RegisterParameters registerParameters) {
        Map<String, String> userAttributes = new HashMap<>();
        userAttributes.put("email", registerParameters.getEmail());
        userAttributes.put("given_name", registerParameters.getGivenName());
        userAttributes.put("family_name", registerParameters.getFamilyName());
        userAttributes.put("nickname", registerParameters.getNickname());

        List<AttributeType> attributes = userAttributes.entrySet().stream()
                .map(entry -> AttributeType.builder()
                        .name(entry.getKey())
                        .value(entry.getValue())
                        .build())
                .collect(Collectors.toList());

        SignUpRequest signUpRequest = SignUpRequest.builder()
                .clientId(clientId)
                .username(registerParameters.getNickname())
                .password(registerParameters.getPassword())
                .userAttributes(attributes)
                .build();

        try {
            SignUpResponse response = cognitoClient.signUp(signUpRequest);
            logger.info("User {} signed up successfully. User confirmed: {}", registerParameters.getEmail(), response.userConfirmed());
            return new RequestUser(
                    null,
                    UUID.fromString(response.userSub()),
                    registerParameters.getEmail(),
                    registerParameters.getGivenName(),
                    registerParameters.getFamilyName(),
                    registerParameters.getNickname()
            );
        } catch (UsernameExistsException uee) {
            logger.error("Erro ao registrar usuário: {}", uee.getMessage());
            throw new RuntimeException("Usuário já cadastrado", uee);
        }
    }

    public LoginResponseView signInUser (LoginParameters loginParameters) {
        loginParameters.isValid();
        RequestUser requestUser = new RequestUser();

        Map<String, String> authParameters = new HashMap<>();
        String credentialType;
        if (loginParameters.getEmail() == null || loginParameters.getEmail().isBlank()) {
            authParameters.put("USERNAME", loginParameters.getNickname());
            credentialType = loginParameters.getNickname();
        } else {
            authParameters.put("USERNAME", loginParameters.getEmail());
            credentialType = loginParameters.getEmail();
        }
        authParameters.put("PASSWORD", loginParameters.getPassword());


        InitiateAuthRequest authRequest = InitiateAuthRequest.builder()
                .clientId(clientId)
                .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
                .authParameters(authParameters)
                .build();

        try {
            InitiateAuthResponse response = cognitoClient.initiateAuth(authRequest);
            logger.info("Login bem-sucedido para o usuário: {}", credentialType);

            UserView user = userRepository.getUserByNicknameOrEmail(credentialType);
            requestUser.setId(user.getId());
            requestUser.setUuid(user.getUuid());
            requestUser.setEmail(user.getEmail());
            requestUser.setGivenName(user.getGivenName());
            requestUser.setFamilyName(user.getFamilyName());
            requestUser.setNickname(user.getNickname());

            return new LoginResponseView(
                    response.authenticationResult().idToken(),
                    response.authenticationResult().accessToken(),
                    response.authenticationResult().refreshToken(),
                    requestUser
            );
        } catch (Exception e) {
            logger.error("Erro ao fazer login do usuário: {}", e.getMessage());
            throw new RuntimeException("Falha no login do usuário", e);
        }
    }

    public LoginResponseView confirmEmailAndSignIn (
            ConfirmEmailParameters confirmEmailParameters, String code
    ) {
        ConfirmSignUpRequest confirmSignUpRequest = ConfirmSignUpRequest.builder()
                .clientId(clientId)
                .username(confirmEmailParameters.getNickname())
                .confirmationCode(code)
                .build();

        try {
            cognitoClient.confirmSignUp(confirmSignUpRequest);
            logger.info("User {} confirmed successfully.", confirmEmailParameters.getNickname());

            AdminInitiateAuthRequest authRequest = AdminInitiateAuthRequest.builder()
                    .userPoolId(userPoolId)
                    .clientId(clientId)
                    .authFlow(AuthFlowType.ADMIN_USER_PASSWORD_AUTH)
                    .authParameters(Map.of("USERNAME", confirmEmailParameters.getNickname(),
                                    "PASSWORD", confirmEmailParameters.getPassword()))
                    .build();

            AdminInitiateAuthResponse response = cognitoClient.adminInitiateAuth(authRequest);

            Long userId = userRepository.create(
                    new User (
                            confirmEmailParameters.getUuid(),
                            confirmEmailParameters.getEmail(),
                            confirmEmailParameters.getGivenName(),
                            confirmEmailParameters.getFamilyName(),
                            confirmEmailParameters.getNickname()
                    )
            );

            return new LoginResponseView(
                    response.authenticationResult().idToken(),
                    response.authenticationResult().accessToken(),
                    response.authenticationResult().refreshToken(),
                    new RequestUser(
                            userId,
                            UUID.fromString(confirmEmailParameters.getUuid()),
                            confirmEmailParameters.getEmail(),
                            confirmEmailParameters.getGivenName(),
                            confirmEmailParameters.getFamilyName(),
                            confirmEmailParameters.getNickname()
                    )
            );
        } catch (Exception e) {
            logger.error("Error confirming user: {}", e.getMessage());
            throw new RuntimeException("Failed to sign up user", e);
        }
    }

    public String resetPassword (String credential, String code, String newPassword) {
        if ((code == null || code.isBlank()) && (newPassword == null || newPassword.isBlank())) {
            ForgotPasswordRequest forgotPasswordRequest = ForgotPasswordRequest.builder()
                    .clientId(clientId)
                    .username(credential)
                    .build();

            try {
                ForgotPasswordResponse response = cognitoClient.forgotPassword(forgotPasswordRequest);
                logger.info("Verifique seu e-mail para redefinir sua senha.");
                return "Verifique seu e-mail para redefinir sua senha.";
            } catch (Exception e) {
                logger.error("Erro ao validar a credencial: {}. Erro: {}",credential, e.getMessage());
                throw new RuntimeException("Failed to sign up user", e);
            }
        } else {
            final String PASSWORD_REGEX = "^(?!^ |.* $)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\^\\$\\*\\.\\[\\]\\{\\}\\(\\)\\?\\-!\"@#%&/\\\\,><' ;:|~`_+=]).{8,}$";

            if (!newPassword.matches(PASSWORD_REGEX)) {
                throw new IllegalArgumentException(
                        "A senha deve conter pelo menos 8 caracteres, incluindo um número, uma letra minúscula, uma letra maiúscula e um caractere especial. Não pode conter espaços no início ou no fim."
                );
            }

            ConfirmForgotPasswordRequest confirmForgotPasswordRequest = ConfirmForgotPasswordRequest.builder()
                    .clientId(clientId)
                    .username(credential)
                    .confirmationCode(code)
                    .password(newPassword)
                    .build();

            try {
                cognitoClient.confirmForgotPassword(confirmForgotPasswordRequest);
                logger.info("Senha redefinida!");
                return "Senha redefinida!";
            } catch (Exception e) {
                logger.error("Erro ao resetar a senha: {}", e.getMessage());
                throw new RuntimeException("Failed to confirm password reset", e);
            }
        }
    }

    public void resendSignUpCode (String nickname) {
        ResendConfirmationCodeRequest resendConfirmationCodeRequest = ResendConfirmationCodeRequest.builder()
                .clientId(clientId)
                .username(nickname)
                .build();

        try {
            ResendConfirmationCodeResponse response = cognitoClient.resendConfirmationCode(resendConfirmationCodeRequest);
            logger.info("Código reenviado. Verifique seu e-mail.");
        } catch (Exception e) {
            logger.error("Erro ao reenviar o código: {}", e.getMessage());
            throw new RuntimeException("Failed to sign up user", e);
        }
    }

    public String deleteRequestUser(String nickname, String uuid) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String payload = mapper.writeValueAsString(Map.of(
                "nickname", nickname.trim(),
                "uuid", uuid.trim()
        ));

        try (LambdaClient lambdaClient = LambdaClient.builder()
                .region(Region.of(region))
                .build())
        {
            InvokeRequest request = InvokeRequest.builder()
                    .functionName(functionName)
                    .payload(SdkBytes.fromUtf8String(payload))
                    .build();

            InvokeResponse response = lambdaClient.invoke(request);

            return response.payload().asUtf8String();
        }
    }
}

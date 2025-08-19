package br.com.zaimu.backend.service.impl;

import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.repository.hibernate.UserRepository;
import br.com.zaimu.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthFlowType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ConfirmSignUpRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ConfirmSignUpResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ExplicitAuthFlowsType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.InitiateAuthRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.InitiateAuthResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.SignUpRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.SignUpResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl extends RequestUser implements AuthService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    private final CognitoIdentityProviderClient cognitoClient;

    @Value("${aws.cognito.client-id}")
    private String clientId;

    public AuthServiceImpl(@Value("${aws.region}") String region) {
        this.cognitoClient = CognitoIdentityProviderClient.builder()
                .region(Region.of(region))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    public RequestUser signUpUser (RegisterParameters registerParameters) {
        RequestUser requestUser = new RequestUser();
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
            System.out.println("User " + registerParameters.getEmail() + " signed up successfully. User confirmed: " + response.userConfirmed());
//            requestUser.setUserId();
            requestUser.setUuid(response.userSub());
            requestUser.setEmail(registerParameters.getEmail());
            requestUser.setGivenName(registerParameters.getGivenName());
            requestUser.setFamilyName(registerParameters.getFamilyName());
            requestUser.setNickname(registerParameters.getNickname());
        } catch (Exception e) {
            System.err.println("Error signing up user: " + e.getMessage());
            throw new RuntimeException("Failed to sign up user", e);
        }

        return requestUser;
    }

    public RequestUser signInUser (LoginParameters loginParameters) {

        loginParameters.isValid();
        RequestUser requestUser = new RequestUser();

        Map<String, String> authParameters = new HashMap<>();
        String credentialType;
        if (loginParameters.getEmail() == null || loginParameters.getEmail().isBlank()) {
            authParameters.put("USERNAME", loginParameters.getUsername());
            credentialType = loginParameters.getUsername();
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
            System.out.println("Login bem-sucedido para o usuário: " + credentialType);
            // return response.authenticationResult();
        } catch (Exception e) {
            System.err.println("Erro ao fazer login do usuário: " + e.getMessage());
            throw new RuntimeException("Falha no login do usuário", e);
        }
        return requestUser;
    }

    public void confirmEmail (String nickname, String code) {
        ConfirmSignUpRequest confirmSignUpRequest = ConfirmSignUpRequest.builder()
                .clientId(clientId)
                .username(nickname)
                .confirmationCode(code)
                .build();

        try {
            ConfirmSignUpResponse response = cognitoClient.confirmSignUp(confirmSignUpRequest);
            System.out.println("User " + nickname + " confirmed successfully.");
        } catch (Exception e) {
            System.err.println("Error confirming user: " + e.getMessage());
            throw new RuntimeException("Failed to sign up user", e);
        }
    }
}

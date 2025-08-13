package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    RegisterService registerService;

    @PostMapping
    public HttpResponse register(
            @RequestBody RegisterParameters registerParameters
    ) {
        try {
            registerService.registerUser(registerParameters);
            return HttpResponse.newBuilder().statusCode(200).build();
        } catch (Exception ex) {
            return HttpResponse.newBuilder().statusCode(500).build();
        }

        try {
            User newUser = registerService.registerUser(registerParameters);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("Erro ao registrar o usuário.");
        }




        RequestUser requestUser = new RequestUser();
        LoginSSORequest loginSSORequest = loginService.getLoginSSORequestFromLoginParameters(loginParameters);
        SsoAppTokenClaims ssoAppTokenClaims = loginService.getSsoAppTokenClaims(loginSSORequest);
        String ssoAppToken = loginService.getSsoAppToken(ssoAppTokenClaims);
        requestUser.setUserId(ssoAppTokenClaims.getPersonId());
        Long playerId = playerService.createPlayerIfNotExists(ssoAppTokenClaims.getPersonId(),
                ssoAppTokenClaims.getTenantId());
        requestUser.setUserId(ssoAppTokenClaims.getPersonId());
        requestUser.setPlayerId(playerId);
        requestUser.setUsername(ssoAppTokenClaims.getSub());
        requestUser.setName(ssoAppTokenClaims.getGivenName());
        requestUser.setDisplayName(ssoAppTokenClaims.getDisplayName());
        requestUser.setCompanyId(ssoAppTokenClaims.getTenantId());
        requestUser.setEmail("");
        requestUser.setIat(ssoAppTokenClaims.getIat());
        requestUser.setExp(ssoAppTokenClaims.getExp());
        requestUser.setIss("https://www.kyros.com.br");
        requestUser.setPermissions(ssoAppTokenClaims.getScopes());
        requestUser.setScopes(ssoAppTokenClaims.getScopes());
        requestUser.setWorkgroupsIds(ssoAppTokenClaims.getWorkgroupsIds());
        requestUser.setRealmName(ssoAppTokenClaims.getRealmName());
        Jws<Claims> wpTokenClaims = Jwts.parser().setSigningKey(tokenSigningKey).parseClaimsJws(ssoAppToken);
        wpTokenClaims.getBody().put("name", requestUser.getName());
        wpTokenClaims.getBody().put("displayName", requestUser.getDisplayName());
        wpTokenClaims.getBody().put("email", requestUser.getEmail());
        wpTokenClaims.getBody().put("type", "WEBPORTAL");
        wpTokenClaims.getBody().put("playerId", requestUser.getPlayerId());
        wpTokenClaims.getBody().put("personId", requestUser.getUserId());
        wpTokenClaims.getBody().put("workgroupsIds", requestUser.getWorkgroupsIds());
        wpTokenClaims.getBody().put("companyId", requestUser.getCompanyId());
        wpTokenClaims.getBody().put("authorizationToken", ssoAppTokenClaims.getAuthorizationToken());
        Date expiration = Date.from(Instant.ofEpochSecond(requestUser.getExp()));
        String wpAppToken = loginService.getWpAppToken(wpTokenClaims, expiration);
        LoginResponseView loginResponseView = new LoginResponseView();
        loginResponseView.setSsoId("");
        loginResponseView.setUserToken(ssoAppToken);
        loginResponseView.setAppToken(wpAppToken);
        loginResponseView.setUser(requestUser);
        response.setHeader("Set-Cookie", "jwt=" + wpAppToken + "; Domain=" + cookieDomain +
                "; Path=/; HttpOnly; Secure; SameSite=None");
        response.setHeader("X-Token", wpAppToken);
        return new HttpResponse(0, loginResponseView);






    }
}

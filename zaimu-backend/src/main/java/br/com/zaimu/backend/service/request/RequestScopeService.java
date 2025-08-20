package br.com.zaimu.backend.service.request;

import br.com.zaimu.backend.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;

public class RequestScopeService {

    @Autowired
    private JwtEncoder jwtEncoder;

    public String generateToken(User user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("zaimu-api")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600)) // 1 hora
                .subject(user.getId().toString())
                .claim("username", user.getNickname())
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

//    public Cookie getCookie(String key) {
//        HttpServletRequest request = RequestContext.getCurrentInstance().getRequest();
//        Cookie[] cookies = request.getCookies();
//        if (cookies != null) {
//            Optional<Cookie> cookieOptional = Arrays.stream(cookies)
//                    .filter(c -> c.getName().equals(key))
//                    .findFirst();
//
//            return cookieOptional.orElse(null);
//        }
//        return null;
//    }
//
//    private String getJwt() {
//        Cookie jwtCookie = getCookie("jwt");
//        String jwt = jwtCookie != null ? jwtCookie.getValue() : null;
//        if (jwt == null) {
//            HttpServletRequest request = RequestContext.getCurrentInstance().getRequest();
//            jwt = request.getHeader("X-Token");
//        }
//
//        return jwt;
//    }

//    public Long getUserId()  {
//        try {
//            String jwt = getJwt();
//            if (jwt == null) {
//                throw new ("FAIL_TO_ACCESS_TOKEN");
//            }
//            DecodedJWT decoded = JWT.decode(jwt);
//            Map<String, Claim> attributes = decoded.getClaims();
//            if (!attributes.isEmpty() && attributes.containsKey("personId")) {
//                return attributes.get("personId").asLong();
//
//            }
//            throw new ("TOKEN_USERID_INVALID");
//        } catch (JWTDecodeException |  e) {
//            logger.error(String.format("Fail at reading token from request : %s", e.getMessage()));
//            throw new (e.getMessage(), e);
//        }
//    }
}

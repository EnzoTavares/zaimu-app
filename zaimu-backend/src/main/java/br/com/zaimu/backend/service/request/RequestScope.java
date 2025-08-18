//package br.com.zaimu.backend.service.request;
//
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//
//import java.util.Arrays;
//import java.util.Map;
//import java.util.Optional;
//
//public class RequestScope {
//
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
//
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
//}

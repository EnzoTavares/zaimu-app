package br.com.zaimu.backend.service.request;

import br.com.zaimu.backend.model.exception.ZaimuTokenException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;



@Component
public class RequestScopeService {

    private final Logger logger = LoggerFactory.getLogger(RequestScopeService.class);

    public String getToken() throws ZaimuTokenException {
        try {
            String jwt = getJwt();
            if (jwt == null) {
                throw new ZaimuTokenException("FAIL_TO_ACCESS_TOKEN");
            }
            return jwt;
        } catch (Exception ex) {
            logger.error(String.format("Fail at reading token from request : %s", ex.getMessage()));
            throw new ZaimuTokenException("FAIL_AT_GET_AUTHORIZATION", ex);
        }
    }

    public String getJwt() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt jwt) {
            return jwt.getTokenValue();
        }
        return null;
    }

    public Long getUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt jwt) {
            Object userIdClaim = jwt.getClaims().get("userId");
            if (userIdClaim != null) {
                return Long.valueOf(userIdClaim.toString());
            }
        }
        return null;
    }
}

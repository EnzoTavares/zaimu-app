package br.com.zaimu.backend.model.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
public class RequestUser {
    String authorizationToken;
    Long userId;
    UUID uuid;
    String email;
    String givenName;
    String familyName;
    String nickname;
    List<String> scopes;
//    Customization customization;

    public RequestUser(String token, String tokenSigningKey) {
        Claims claims = Jwts.parser().setSigningKey(tokenSigningKey).parseClaimsJws(token).getBody();
        this.userId = claims.get("id", Long.class);
        this.uuid = claims.get("uuid", UUID.class);
        this.email = claims.get("email", String.class);
        this.givenName = claims.get("givenName", String.class);
        this.familyName = claims.get("familyName", String.class);
        this.nickname = claims.get("nickname", String.class);
        this.authorizationToken = token;
    }

    private enum ScopeENUM {
        USER("ZAIMU.USER", 1),
        ADMIN("ZAIMU.ADMIN", 2);

        private String scopeName;
        private int value;

        ScopeENUM( String scopeName, int value ) {
            this.scopeName = scopeName;
            this.value = value;
        }

        public String scopeName() { return scopeName; }

        public int value() {
            return value;
        }
    }

    public String toString() {
        return "{" +
                "\"id\": " + userId + "," +
                "\"uuid\": \"" + uuid + "\"," +
                "\"email\": \"" + email + "\"," +
                "\"givenName\": \"" + givenName + "\"," +
                "\"familyName\": \"" + familyName + "\"," +
                "\"nickname\": \"" + nickname + "\"" +
                "}";
    }
}
package br.com.zaimu.backend.model.security;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class RequestUser {
    String authorizationToken;

    Long userId;

    Long playerId;

    String username;

    String name;

    String email;

    String type;

    String sub;

    Long iat;

    Long exp;

    String iss;

    List<String> permissions;

    List<String> scopes;

    Customization customization;

    String tokenSigningKey;

    String realmName;


    public RequestUser() {

    }


    public RequestUser( String token, String tokenSigningKey ) throws WorkPlayerLoginException {
        try {
            this.tokenSigningKey = tokenSigningKey;
            Claims claims = Jwts.parser().setSigningKey(tokenSigningKey)
                    .parseClaimsJws(token).getBody();
            this.setDisplayName( claims.get( "displayName", String.class) );
            this.setUsername( claims.get( "sub", String.class ) );
            this.setUserId( claims.get( "personId", Long.class ) );
            this.setName( claims.get( "name", String.class ) );
            this.setEmail( claims.get( "email", String.class ) );
            this.setCompanyId( claims.get( "tenantId", Long.class ) );
            this.setIss( claims.get( "iss", String.class ) );
            this.setExp( claims.get( "exp", Date.class ).getTime() / 1000 );
            this.setIat( claims.get("iat", Date.class).getTime() / 1000 );
            this.setType( claims.get( "type", String.class ) );
            this.permissions = claims.get( "permissions", List.class );
            this.scopes = claims.get( "scopes", List.class );
            this.playerId = claims.get( "playerId", Long.class );
            this.workgroupsIds = claims.get( "workgroupsIds", List.class );
            this.realmName = claims.get("realm_name", String.class);
            this.authorizationToken = token;


        }catch( Exception e ){
            throw new WorkPlayerLoginException( "FAIL_AT_READ_TOKEN", e );
        }

    }

    @JsonIgnore
    public String getAuthorizationToken() {

        return authorizationToken;
    }


    public List<String> getPermissions() {

        if ( permissions != null ) {
            return permissions;
        }
        return new ArrayList<String>();
    }





    public List<String> getScopes() {

        if ( scopes != null ) {
            return scopes;
        }
        return new ArrayList<String>();
    }


    @Deprecated
    public String toJWT() {

        String[] permissionArray = new String[permissions.size()];
        for ( int i = 0; i < permissions.size(); i++ ) {
            permissionArray[i] = String.valueOf( permissions.get( i ) );
        }

        String[] scopesArray = new String[scopes.size()];
        for ( int i = 0; i < scopes.size(); i++ ) {
            scopesArray[i] = String.valueOf( scopes.get( i ) );
        }

        ScopeHierarchyENUM highestScope = null;
        for (String scope : scopes) {
            ScopeHierarchyENUM scopeHierarchyENUM = ScopeHierarchyENUM.fromScopeName(scope);
            if (scopeHierarchyENUM == null) {
                continue;
            }

            if (highestScope == null || scopeHierarchyENUM.value() < highestScope.value()) {
                highestScope = scopeHierarchyENUM;
            }
        }


        Map<String, Object> hasuraClaims = new HashMap<>();
        hasuraClaims.put("x-hasura-allowed-roles", scopes);
        hasuraClaims.put("x-hasura-default-role", highestScope != null ? highestScope.scopeName() : null);
        hasuraClaims.put("x-hasura-user-id", userId.toString());
        hasuraClaims.put("x-hasura-player-id", playerId.toString());
        hasuraClaims.put("x-hasura-org-id", companyId.toString());
        hasuraClaims.put("x-hasura-username", username);

        String token = Jwts.builder()
                .claim("authorizationToken", this.authorizationToken)
                .claim("userId", this.userId)
                .claim("name", this.name)
                .claim("email", this.email)
                .claim("username", this.username)
                .claim("displayName", this.displayName)
                .claim("companyId", this.companyId)
                .claim("companyName", this.companyName)
                .claim("iat", this.iat)
                .claim("iss", this.iss)
                .claim("exp", this.exp)
                .claim("type", this.type)
                .claim("permissions", permissionArray)
                .claim("scopes", scopesArray).claim("playerId", playerId)
                .claim("workgroupsIds", workgroupsIds)
                .claim("https://hasura.io/jwt/claims", hasuraClaims)
                .signWith(SignatureAlgorithm.HS512, tokenSigningKey).compact();


        return token;
    }


    public String toString() {

        String scope = "";
        if ( this.scopes != null && this.scopes.size() > 0 ) {
            for ( String item : this.scopes ) {
                if ( scope.length() == 0 ) {
                    scope += "\"";
                } else {
                    scope += ",\"";
                }
                scope += item + "\"";
            }
        }

        String permission = "";
        if ( this.permissions != null && this.permissions.size() > 0 ) {
            for ( String item : this.permissions ) {
                if ( permission.length() == 0 ) {
                    permission += "\"";
                } else {
                    permission += ",\"";
                }
                permission += item + "\"";
            }
        }

        return "{" + "\"iat\": " + this.iat + "," + "\"displayName\":\"" + this.displayName + "\"," + "\"username\":\"" + this.username + "\","
                + "\"userId\": " + this.userId + "," + "\"name\":\"" + this.name + "\"," + "\"email\":\"" + this.email + "\"," + "\"companyId\": "
                + this.companyId + "," + "\"companyName\":\"" + this.companyName + "\"," + "\"sub\":\"" + this.sub + "\"," + "\"iss\":\"" + this.iss + "\","
                + "\"type\":\"" + this.type + "\"," + "\"permissions\":[" + permission + "]," + "\"scopes\":[" + scope + "]" + "\"customization\":[" + customization + "]}";

    }

    private enum ScopeHierarchyENUM {
        BOSS("WP.BOSS", 1),
        LEADER("WP.LEADER", 2),
        MASTER("WP.MASTER", 3),
        PLAYER("WP.PLAYER", 4);

        private String scopeName;
        private int value;

        ScopeHierarchyENUM(String scopeName, int value) {
            this.scopeName = scopeName;
            this.value = value;
        }

        public String scopeName() { return scopeName; }

        public int value() {
            return value;
        }

        public static ScopeHierarchyENUM fromScopeName(String scopeName) {
            for (ScopeHierarchyENUM scopeHierarchyENUM : ScopeHierarchyENUM.values()) {
                if (scopeHierarchyENUM.scopeName.equalsIgnoreCase(scopeName)) {
                    return scopeHierarchyENUM;
                }
            }
            return null;
        }
    }
}

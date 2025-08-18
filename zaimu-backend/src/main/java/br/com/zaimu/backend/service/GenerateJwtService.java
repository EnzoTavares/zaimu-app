package br.com.zaimu.backend.service;

import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import br.com.zaimu.backend.model.entity.UserEntity;

@Service
public class GenerateJwtService {

    @Autowired
    private JwtEncoder jwtEncoder;

    public String generateToken(UserEntity user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("zaimu-api")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600)) // 1 hora
                .subject(user.getId().toString())
                .claim("username", user.getUsername())
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}

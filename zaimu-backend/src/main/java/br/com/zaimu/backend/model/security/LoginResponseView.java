package br.com.zaimu.backend.model.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginResponseView {
    String userToken;
    String appToken;
    String refreshToken;
    RequestUser user;
}

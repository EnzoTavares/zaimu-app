package br.com.zaimu.backend.model.to;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class UserView {
    private Long id;
    private UUID uuid;
    private String email;
    private String givenName;
    private String familyName;
    private String nickname;
    private Timestamp dateCreated;
    private Timestamp dateUpdated;
    private Timestamp dateLastLogin;
    private Long idCustomization;
    private String profilePicUrl;
    private Character status;

    private static final Logger logger = LoggerFactory.getLogger(UserView.class);

    public UserView (ResultSet rs) {
        try {
            this.id = rs.getLong("ID_USER");
            this.uuid = UUID.fromString(rs.getString("CD_COGNITO_SUB"));
            this.email = rs.getString("DS_EMAIL");
            this.givenName = rs.getString("NM_GIVEN_NAME");
            this.familyName = rs.getString("NM_FAMILY_NAME");
            this.nickname = rs.getString("CD_NICKNAME");
            this.dateCreated = rs.getTimestamp("DT_CREATED");
            this.dateUpdated = rs.getTimestamp("DT_UPDATED");
            this.dateLastLogin = rs.getTimestamp("DT_LAST_LOGIN");
            this.profilePicUrl = rs.getString("VL_LINK_PROFILE_PIC");
            this.idCustomization = rs.getLong("ID_CUSTOMIZATION");
            this.status = rs.getString("FL_STATUS").charAt(0);
        } catch (SQLException e) {
            logger.error(e.getMessage());
        }
    }
}

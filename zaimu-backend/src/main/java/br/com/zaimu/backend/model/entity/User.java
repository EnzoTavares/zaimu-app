package br.com.zaimu.backend.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table( name = "USER", schema = "ZADM" )
@SequenceGenerator( name = "ZADM.SQ_USER_ID", sequenceName = "ZADM.SQ_USER_ID", allocationSize = 1 )
@Getter
@Setter
@NoArgsConstructor
public class User implements Serializable {

    private static final long serialVersionUID = -1280191071226152445L;

    @Id
    @Column(name = "ID_USER")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ZADM.SQ_USER_ID")
    private Long id;

    @NotNull
    @Column(name = "CD_COGNITO_SUB")
    private UUID uuid;

    @NotNull
    @Column(name = "DS_EMAIL")
    private String email;

    @NotNull
    @Column(name = "NM_GIVEN_NAME")
    private String givenName;

    @NotNull
    @Column(name = "NM_FAMILY_NAME")
    private String familyName;

    @NotNull
    @Column(name = "CD_NICKNAME")
    private String nickname;

    @NotNull
    @Column(name = "DT_CREATED")
    private Timestamp createDate = Timestamp.from(Instant.now());

    @Column(name = "DT_UPDATED")
    @Nullable
    private Timestamp updateDate;

    @Column(name = "DT_LAST_LOGIN")
    @Nullable
    private Timestamp lastLoginDate;

    @Column(name = "VL_LINK_PROFILE_PIC")
    @Nullable
    private String profilePicUrl;

    @Column(name = "ID_CUSTOMIZATION")
    @Nullable
    private Long idCustomization;

    @NotNull
    @Column(name = "FL_STATUS")
    private Character flStatus;

    public User (String uuid, String email, String givenName, String familyName, String nickname) {
        this.uuid = UUID.fromString(uuid);
        this.email = email;
        this.givenName = givenName;
        this.familyName = familyName;
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", uuid=" + uuid +
                ", email='" + email + '\'' +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", lastLoginDate=" + lastLoginDate +
                ", profilePicUrl=" + profilePicUrl +
                ", idCustomization=" + idCustomization +
                ", flStaus=" + flStatus +
                '}';
    }

    public User clone() throws CloneNotSupportedException {
        User user = (User) super.clone();
        return user;
    }
}

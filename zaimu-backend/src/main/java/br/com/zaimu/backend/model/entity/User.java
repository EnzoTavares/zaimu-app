package br.com.zaimu.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.math.BigDecimal;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    private BigDecimal uuid;

    @NotNull
    @Column(name = "DS_EMAIL")
    private String email;

    @NotNull
    @Column(name = "NM_FIRST_NAME")
    private String firstName;

    @NotNull
    @Column(name = "NM_LAST_NAME")
    private String lastName;

    @NotNull
    @Column(name = "CD_NICKNAME")
    private String nickname;

    @NotNull
    @Column(name = "DT_CREATED")
    private Date createDate;

    @Column(name = "DT_UPDATED")
    @Nullable
    private Date updateDate;

    @Column(name = "DT_LAST_LOGIN")
    @Nullable
    private Date lastLoginDate;

    @Column(name = "VL_LINK_PROFILE_PIC")
    @Nullable
    private Float profilePicUrl;

    @Column(name = "ID_CUSTOMIZATION")
    @Nullable
    private Float idCustomization;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", uuid=" + uuid +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", lastLoginDate=" + lastLoginDate +
                ", profilePicUrl=" + profilePicUrl +
                ", idCustomization=" + idCustomization +
                '}';
    }

    public User clone() throws CloneNotSupportedException {
        User user = (User) super.clone();
        return user;
    }
}

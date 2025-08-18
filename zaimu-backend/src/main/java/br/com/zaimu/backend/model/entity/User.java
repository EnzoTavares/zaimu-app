//package br.com.zaimu.backend.model.entity;
//
//import br.com.kyros.workplayer.model.enums.ActiveFlagEnum;
//import br.com.kyros.workplayer.model.enums.TaskRuleFlagEnum;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.OrderBy;
//import jakarta.persistence.SequenceGenerator;
//import jakarta.persistence.Table;
//import jakarta.persistence.Transient;
//import jakarta.validation.constraints.NotNull;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.lang.Nullable;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.io.Serializable;
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@Entity
//@Table( name = "USER", schema = "ZADM" )
//@SequenceGenerator( name = "ZADM.SQ_USER_ID", sequenceName = "ZADM.SQ_USER_ID", allocationSize = 1 )
//@Getter
//@Setter
//@NoArgsConstructor
//public class User implements Serializable {
//
//    private static final long serialVersionUID = -1280191071226152445L;
//
//    @Id
//    @Column(name = "ID_USER")
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ZADM.SQ_USER_ID")
//    private Long id;
//
//    @NotNull
//    @Column(name = "CD_COGNITO_SUB")
//    private BigDecimal uuid;
//
//    @Column(name = "DS_EMAIL")
//    private String email;
//
//    @Column(name = "NM_FIRST_NAME")
//    private String firstName;
//
//    @Column(name = "NM_LAST_NAME")
//    private String lastName;
//
//    @Column(name = "CD_NICKNAME")
//    private String nickname;
//
//    @Column(name = "DT_CREATED")
//    private Date createDate;
//
//    @Column(name = "DT_UPDATED")
//    @Nullable
//    private Date updateDate;
//
//    @Column(name = "DT_LAST_LOGIN")
//    @Nullable
//    private Date lastLoginDate;
//
//    @Column(name = "VL_LINK_PROFILE_PIC")
//    @Nullable
//    private Float profilePicUrl;
//
//    @Column(name = "ID_CUSTOMIZATION")
//    @Nullable
//    private Float idCustomization;
//
//    @Override
//    public String toString() {
//        return "User{" +
//                "id=" + id +
//                ", uuid=" + uuid +
//                ", email='" + email + '\'' +
//                ", firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", nickname='" + nickname + '\'' +
//                ", createDate=" + createDate +
//                ", updateDate=" + updateDate +
//                ", lastLoginDate=" + lastLoginDate +
//                ", profilePicUrl=" + profilePicUrl +
//                ", idCustomization=" + idCustomization +
//                '}';
//    }
//
//    public User clone() throws CloneNotSupportedException {
//        User user = (User) super.clone();
//        return user;
//    }
//}

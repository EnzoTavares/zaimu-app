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
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table( name = "USER_TRANSACTION", schema = "ZADM" )
@Getter
@Setter
@NoArgsConstructor
public class TransactionUser implements Serializable {

    private static final long serialVersionUID = -1280191071226152445L;

    @Id
    @Column(name = "ID_TRANSACTION")
    private Long id;

    @NotNull
    @Column(name = "ID_USER")
    private Long idUser;

    @NotNull
    @Column(name = "DS_TITLE")
    private String title;

    @NotNull
    @Column(name = "VL_AMOUNT")
    private BigDecimal amount;

    @NotNull
    @Column(name = "ID_CATEGORY")
    private Long idCategory;

    @NotNull
    @Column(name = "ID_TYPE")
    private Long idType;

    @NotNull
    @Column(name = "DT_TRANSACTION")
    private Timestamp transactionDate;

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", idUser=" + idUser +
                ", title='" + title + '\'' +
                ", amount=" + amount +
                ", idCategory=" + idCategory +
                ", idType=" + idType +
                ", transactionDate=" + transactionDate +
                '}';
    }
}

package br.com.stockmaster.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
@Entity @Table(name="stock_movements")
public class Movement {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotNull @Column(nullable=false) private Long productId;
 @NotBlank @Pattern(regexp="IN|OUT") @Column(nullable=false,length=3) private String type;
 @NotNull @Min(1) @Column(nullable=false) private Integer quantity;
 @Column(length=120) private String note;
 @Column(nullable=false) private LocalDateTime date=LocalDateTime.now();
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public Long getProductId(){return productId;} public void setProductId(Long v){productId=v;}
 public String getType(){return type;} public void setType(String v){type=v;}
 public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;}
 public String getNote(){return note;} public void setNote(String v){note=v;}
 public LocalDateTime getDate(){return date;} public void setDate(LocalDateTime v){date=v;}
}
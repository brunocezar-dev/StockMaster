package br.com.stockmaster.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
@Entity @Table(name="products")
public class Product {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false,length=100) private String name;
 @NotBlank @Column(nullable=false,length=60) private String category;
 @NotBlank @Column(nullable=false,unique=true,length=40) private String sku;
 @NotNull @Min(0) @Column(nullable=false) private Integer quantity;
 @NotNull @Min(0) @Column(nullable=false) private Integer minimumStock;
 @NotNull @DecimalMin("0.00") @Column(nullable=false,precision=12,scale=2) private BigDecimal price;
 private Long supplierId;
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getCategory(){return category;} public void setCategory(String v){category=v;}
 public String getSku(){return sku;} public void setSku(String v){sku=v;}
 public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;}
 public Integer getMinimumStock(){return minimumStock;} public void setMinimumStock(Integer v){minimumStock=v;}
 public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal v){price=v;}
 public Long getSupplierId(){return supplierId;} public void setSupplierId(Long v){supplierId=v;}
}
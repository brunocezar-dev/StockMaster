package br.com.stockmaster.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity @Table(name="suppliers")
public class Supplier {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false,length=120) private String name;
 @Email @Column(length=140) private String email;
 @Column(length=30) private String phone;
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getName(){return name;} public void setName(String v){name=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
}
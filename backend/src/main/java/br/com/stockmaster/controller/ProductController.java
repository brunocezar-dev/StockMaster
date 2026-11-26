package br.com.stockmaster.controller;
import br.com.stockmaster.model.Product;
import br.com.stockmaster.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/products")
public class ProductController {
 private final ProductRepository repo;
 public ProductController(ProductRepository repo){this.repo=repo;}
 @GetMapping public List<Product> list(){return repo.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody Product p){
  if(repo.existsBySkuIgnoreCase(p.getSku()))throw new IllegalArgumentException("SKU já cadastrado.");
  p.setId(null);return repo.save(p);
 }
}
package br.com.stockmaster.controller;
import br.com.stockmaster.model.Movement;
import br.com.stockmaster.model.Product;
import br.com.stockmaster.repository.MovementRepository;
import br.com.stockmaster.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/movements")
public class MovementController {
 private final MovementRepository movements; private final ProductRepository products;
 public MovementController(MovementRepository movements,ProductRepository products){this.movements=movements;this.products=products;}
 @GetMapping public List<Movement> list(){return movements.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED)
 public Movement create(@Valid @RequestBody Movement m){
  Product p=products.findById(m.getProductId()).orElseThrow(()->new IllegalArgumentException("Produto não encontrado."));
  int current=p.getQuantity(),amount=m.getQuantity();
  if("OUT".equals(m.getType())&&amount>current)throw new IllegalArgumentException("Saída maior que o saldo disponível.");
  p.setQuantity("IN".equals(m.getType())?current+amount:current-amount);
  products.save(p);m.setId(null);return movements.save(m);
 }
}
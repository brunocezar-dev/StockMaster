package br.com.stockmaster.controller;
import br.com.stockmaster.model.Supplier;
import br.com.stockmaster.repository.SupplierRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/suppliers")
public class SupplierController {
 private final SupplierRepository repo;
 public SupplierController(SupplierRepository repo){this.repo=repo;}
 @GetMapping public List<Supplier> list(){return repo.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Supplier create(@Valid @RequestBody Supplier s){s.setId(null);return repo.save(s);}
}
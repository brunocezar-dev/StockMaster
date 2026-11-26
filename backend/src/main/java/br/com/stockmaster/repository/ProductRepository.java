package br.com.stockmaster.repository;
import br.com.stockmaster.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product,Long>{boolean existsBySkuIgnoreCase(String sku);}
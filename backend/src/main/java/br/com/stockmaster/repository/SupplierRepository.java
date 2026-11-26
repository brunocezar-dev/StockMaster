package br.com.stockmaster.repository;
import br.com.stockmaster.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SupplierRepository extends JpaRepository<Supplier,Long>{}
package br.com.stockmaster.repository;
import br.com.stockmaster.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MovementRepository extends JpaRepository<Movement,Long>{}
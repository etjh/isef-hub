package nl.etjh.isef.repository;
import nl.etjh.isef.domain.JHInterface;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JHInterface entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JHInterfaceRepository extends JpaRepository<JHInterface, Long> {

}

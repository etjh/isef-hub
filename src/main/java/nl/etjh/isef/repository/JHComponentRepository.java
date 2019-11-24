package nl.etjh.isef.repository;
import nl.etjh.isef.domain.JHComponent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JHComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JHComponentRepository extends JpaRepository<JHComponent, Long> {

}

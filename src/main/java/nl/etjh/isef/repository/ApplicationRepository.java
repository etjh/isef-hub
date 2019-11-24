package nl.etjh.isef.repository;
import nl.etjh.isef.domain.Application;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select application from Application application where application.owner.login = ?#{principal.username}")
    List<Application> findByOwnerIsCurrentUser();

}

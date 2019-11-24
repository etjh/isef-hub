package nl.etjh.isef.repository;
import nl.etjh.isef.domain.Expert;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Expert entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {

    @Query("select expert from Expert expert where expert.user.login = ?#{principal.username}")
    List<Expert> findByUserIsCurrentUser();

}

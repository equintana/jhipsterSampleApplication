package es.keensoft.repository;

import es.keensoft.domain.Filter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Filter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilterRepository extends JpaRepository<Filter, Long> {
    @Query("select distinct filter from Filter filter left join fetch filter.books")
    List<Filter> findAllWithEagerRelationships();

    @Query("select filter from Filter filter left join fetch filter.books where filter.id =:id")
    Filter findOneWithEagerRelationships(@Param("id") Long id);

}

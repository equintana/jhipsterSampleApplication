package es.keensoft.repository;

import es.keensoft.domain.Student;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("select distinct student from Student student left join fetch student.classrooms")
    List<Student> findAllWithEagerRelationships();

    @Query("select student from Student student left join fetch student.classrooms where student.id =:id")
    Student findOneWithEagerRelationships(@Param("id") Long id);

}

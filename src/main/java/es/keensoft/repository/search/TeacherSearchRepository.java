package es.keensoft.repository.search;

import es.keensoft.domain.Teacher;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Teacher entity.
 */
public interface TeacherSearchRepository extends ElasticsearchRepository<Teacher, Long> {
}

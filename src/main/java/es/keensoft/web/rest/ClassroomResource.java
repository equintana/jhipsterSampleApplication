package es.keensoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.keensoft.domain.Classroom;

import es.keensoft.repository.ClassroomRepository;
import es.keensoft.repository.search.ClassroomSearchRepository;
import es.keensoft.web.rest.errors.BadRequestAlertException;
import es.keensoft.web.rest.util.HeaderUtil;
import es.keensoft.web.rest.util.PaginationUtil;
import es.keensoft.service.dto.ClassroomDTO;
import es.keensoft.service.mapper.ClassroomMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Classroom.
 */
@RestController
@RequestMapping("/api")
public class ClassroomResource {

    private final Logger log = LoggerFactory.getLogger(ClassroomResource.class);

    private static final String ENTITY_NAME = "classroom";

    private final ClassroomRepository classroomRepository;

    private final ClassroomMapper classroomMapper;

    private final ClassroomSearchRepository classroomSearchRepository;

    public ClassroomResource(ClassroomRepository classroomRepository, ClassroomMapper classroomMapper, ClassroomSearchRepository classroomSearchRepository) {
        this.classroomRepository = classroomRepository;
        this.classroomMapper = classroomMapper;
        this.classroomSearchRepository = classroomSearchRepository;
    }

    /**
     * POST  /classrooms : Create a new classroom.
     *
     * @param classroomDTO the classroomDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classroomDTO, or with status 400 (Bad Request) if the classroom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/classrooms")
    @Timed
    public ResponseEntity<ClassroomDTO> createClassroom(@Valid @RequestBody ClassroomDTO classroomDTO) throws URISyntaxException {
        log.debug("REST request to save Classroom : {}", classroomDTO);
        if (classroomDTO.getId() != null) {
            throw new BadRequestAlertException("A new classroom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        ClassroomDTO result = classroomMapper.toDto(classroom);
        classroomSearchRepository.save(classroom);
        return ResponseEntity.created(new URI("/api/classrooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /classrooms : Updates an existing classroom.
     *
     * @param classroomDTO the classroomDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classroomDTO,
     * or with status 400 (Bad Request) if the classroomDTO is not valid,
     * or with status 500 (Internal Server Error) if the classroomDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/classrooms")
    @Timed
    public ResponseEntity<ClassroomDTO> updateClassroom(@Valid @RequestBody ClassroomDTO classroomDTO) throws URISyntaxException {
        log.debug("REST request to update Classroom : {}", classroomDTO);
        if (classroomDTO.getId() == null) {
            return createClassroom(classroomDTO);
        }
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        ClassroomDTO result = classroomMapper.toDto(classroom);
        classroomSearchRepository.save(classroom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classroomDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /classrooms : get all the classrooms.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of classrooms in body
     */
    @GetMapping("/classrooms")
    @Timed
    public ResponseEntity<List<ClassroomDTO>> getAllClassrooms(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("timelineevent-is-null".equals(filter)) {
            log.debug("REST request to get all Classrooms where timelineEvent is null");
            return new ResponseEntity<>(StreamSupport
                .stream(classroomRepository.findAll().spliterator(), false)
                .filter(classroom -> classroom.getTimelineEvent() == null)
                .map(classroomMapper::toDto)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Classrooms");
        Page<Classroom> page = classroomRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/classrooms");
        return new ResponseEntity<>(classroomMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /classrooms/:id : get the "id" classroom.
     *
     * @param id the id of the classroomDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classroomDTO, or with status 404 (Not Found)
     */
    @GetMapping("/classrooms/{id}")
    @Timed
    public ResponseEntity<ClassroomDTO> getClassroom(@PathVariable Long id) {
        log.debug("REST request to get Classroom : {}", id);
        Classroom classroom = classroomRepository.findOne(id);
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(classroomDTO));
    }

    /**
     * DELETE  /classrooms/:id : delete the "id" classroom.
     *
     * @param id the id of the classroomDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/classrooms/{id}")
    @Timed
    public ResponseEntity<Void> deleteClassroom(@PathVariable Long id) {
        log.debug("REST request to delete Classroom : {}", id);
        classroomRepository.delete(id);
        classroomSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/classrooms?query=:query : search for the classroom corresponding
     * to the query.
     *
     * @param query the query of the classroom search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/classrooms")
    @Timed
    public ResponseEntity<List<ClassroomDTO>> searchClassrooms(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Classrooms for query {}", query);
        Page<Classroom> page = classroomSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/classrooms");
        return new ResponseEntity<>(classroomMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}

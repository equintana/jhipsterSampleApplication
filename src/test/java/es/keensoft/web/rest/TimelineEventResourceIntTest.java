package es.keensoft.web.rest;

import es.keensoft.JhipsterSampleApplicationApp;

import es.keensoft.domain.TimelineEvent;
import es.keensoft.repository.TimelineEventRepository;
import es.keensoft.repository.search.TimelineEventSearchRepository;
import es.keensoft.service.dto.TimelineEventDTO;
import es.keensoft.service.mapper.TimelineEventMapper;
import es.keensoft.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static es.keensoft.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TimelineEventResource REST controller.
 *
 * @see TimelineEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TimelineEventResourceIntTest {

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    @Autowired
    private TimelineEventRepository timelineEventRepository;

    @Autowired
    private TimelineEventMapper timelineEventMapper;

    @Autowired
    private TimelineEventSearchRepository timelineEventSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimelineEventMockMvc;

    private TimelineEvent timelineEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimelineEventResource timelineEventResource = new TimelineEventResource(timelineEventRepository, timelineEventMapper, timelineEventSearchRepository);
        this.restTimelineEventMockMvc = MockMvcBuilders.standaloneSetup(timelineEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimelineEvent createEntity(EntityManager em) {
        TimelineEvent timelineEvent = new TimelineEvent()
            .visible(DEFAULT_VISIBLE);
        return timelineEvent;
    }

    @Before
    public void initTest() {
        timelineEventSearchRepository.deleteAll();
        timelineEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimelineEvent() throws Exception {
        int databaseSizeBeforeCreate = timelineEventRepository.findAll().size();

        // Create the TimelineEvent
        TimelineEventDTO timelineEventDTO = timelineEventMapper.toDto(timelineEvent);
        restTimelineEventMockMvc.perform(post("/api/timeline-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineEventDTO)))
            .andExpect(status().isCreated());

        // Validate the TimelineEvent in the database
        List<TimelineEvent> timelineEventList = timelineEventRepository.findAll();
        assertThat(timelineEventList).hasSize(databaseSizeBeforeCreate + 1);
        TimelineEvent testTimelineEvent = timelineEventList.get(timelineEventList.size() - 1);
        assertThat(testTimelineEvent.isVisible()).isEqualTo(DEFAULT_VISIBLE);

        // Validate the TimelineEvent in Elasticsearch
        TimelineEvent timelineEventEs = timelineEventSearchRepository.findOne(testTimelineEvent.getId());
        assertThat(timelineEventEs).isEqualToIgnoringGivenFields(testTimelineEvent);
    }

    @Test
    @Transactional
    public void createTimelineEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timelineEventRepository.findAll().size();

        // Create the TimelineEvent with an existing ID
        timelineEvent.setId(1L);
        TimelineEventDTO timelineEventDTO = timelineEventMapper.toDto(timelineEvent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimelineEventMockMvc.perform(post("/api/timeline-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineEventDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimelineEvent in the database
        List<TimelineEvent> timelineEventList = timelineEventRepository.findAll();
        assertThat(timelineEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTimelineEvents() throws Exception {
        // Initialize the database
        timelineEventRepository.saveAndFlush(timelineEvent);

        // Get all the timelineEventList
        restTimelineEventMockMvc.perform(get("/api/timeline-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timelineEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getTimelineEvent() throws Exception {
        // Initialize the database
        timelineEventRepository.saveAndFlush(timelineEvent);

        // Get the timelineEvent
        restTimelineEventMockMvc.perform(get("/api/timeline-events/{id}", timelineEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timelineEvent.getId().intValue()))
            .andExpect(jsonPath("$.visible").value(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTimelineEvent() throws Exception {
        // Get the timelineEvent
        restTimelineEventMockMvc.perform(get("/api/timeline-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimelineEvent() throws Exception {
        // Initialize the database
        timelineEventRepository.saveAndFlush(timelineEvent);
        timelineEventSearchRepository.save(timelineEvent);
        int databaseSizeBeforeUpdate = timelineEventRepository.findAll().size();

        // Update the timelineEvent
        TimelineEvent updatedTimelineEvent = timelineEventRepository.findOne(timelineEvent.getId());
        // Disconnect from session so that the updates on updatedTimelineEvent are not directly saved in db
        em.detach(updatedTimelineEvent);
        updatedTimelineEvent
            .visible(UPDATED_VISIBLE);
        TimelineEventDTO timelineEventDTO = timelineEventMapper.toDto(updatedTimelineEvent);

        restTimelineEventMockMvc.perform(put("/api/timeline-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineEventDTO)))
            .andExpect(status().isOk());

        // Validate the TimelineEvent in the database
        List<TimelineEvent> timelineEventList = timelineEventRepository.findAll();
        assertThat(timelineEventList).hasSize(databaseSizeBeforeUpdate);
        TimelineEvent testTimelineEvent = timelineEventList.get(timelineEventList.size() - 1);
        assertThat(testTimelineEvent.isVisible()).isEqualTo(UPDATED_VISIBLE);

        // Validate the TimelineEvent in Elasticsearch
        TimelineEvent timelineEventEs = timelineEventSearchRepository.findOne(testTimelineEvent.getId());
        assertThat(timelineEventEs).isEqualToIgnoringGivenFields(testTimelineEvent);
    }

    @Test
    @Transactional
    public void updateNonExistingTimelineEvent() throws Exception {
        int databaseSizeBeforeUpdate = timelineEventRepository.findAll().size();

        // Create the TimelineEvent
        TimelineEventDTO timelineEventDTO = timelineEventMapper.toDto(timelineEvent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTimelineEventMockMvc.perform(put("/api/timeline-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineEventDTO)))
            .andExpect(status().isCreated());

        // Validate the TimelineEvent in the database
        List<TimelineEvent> timelineEventList = timelineEventRepository.findAll();
        assertThat(timelineEventList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTimelineEvent() throws Exception {
        // Initialize the database
        timelineEventRepository.saveAndFlush(timelineEvent);
        timelineEventSearchRepository.save(timelineEvent);
        int databaseSizeBeforeDelete = timelineEventRepository.findAll().size();

        // Get the timelineEvent
        restTimelineEventMockMvc.perform(delete("/api/timeline-events/{id}", timelineEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean timelineEventExistsInEs = timelineEventSearchRepository.exists(timelineEvent.getId());
        assertThat(timelineEventExistsInEs).isFalse();

        // Validate the database is empty
        List<TimelineEvent> timelineEventList = timelineEventRepository.findAll();
        assertThat(timelineEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTimelineEvent() throws Exception {
        // Initialize the database
        timelineEventRepository.saveAndFlush(timelineEvent);
        timelineEventSearchRepository.save(timelineEvent);

        // Search the timelineEvent
        restTimelineEventMockMvc.perform(get("/api/_search/timeline-events?query=id:" + timelineEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timelineEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimelineEvent.class);
        TimelineEvent timelineEvent1 = new TimelineEvent();
        timelineEvent1.setId(1L);
        TimelineEvent timelineEvent2 = new TimelineEvent();
        timelineEvent2.setId(timelineEvent1.getId());
        assertThat(timelineEvent1).isEqualTo(timelineEvent2);
        timelineEvent2.setId(2L);
        assertThat(timelineEvent1).isNotEqualTo(timelineEvent2);
        timelineEvent1.setId(null);
        assertThat(timelineEvent1).isNotEqualTo(timelineEvent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimelineEventDTO.class);
        TimelineEventDTO timelineEventDTO1 = new TimelineEventDTO();
        timelineEventDTO1.setId(1L);
        TimelineEventDTO timelineEventDTO2 = new TimelineEventDTO();
        assertThat(timelineEventDTO1).isNotEqualTo(timelineEventDTO2);
        timelineEventDTO2.setId(timelineEventDTO1.getId());
        assertThat(timelineEventDTO1).isEqualTo(timelineEventDTO2);
        timelineEventDTO2.setId(2L);
        assertThat(timelineEventDTO1).isNotEqualTo(timelineEventDTO2);
        timelineEventDTO1.setId(null);
        assertThat(timelineEventDTO1).isNotEqualTo(timelineEventDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(timelineEventMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(timelineEventMapper.fromId(null)).isNull();
    }
}

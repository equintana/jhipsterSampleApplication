package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.ClassroomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Classroom and its DTO ClassroomDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class})
public interface ClassroomMapper extends EntityMapper<ClassroomDTO, Classroom> {

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.name", target = "teacherName")
    ClassroomDTO toDto(Classroom classroom);

    @Mapping(target = "timelineEvent", ignore = true)
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(target = "students", ignore = true)
    Classroom toEntity(ClassroomDTO classroomDTO);

    default Classroom fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classroom classroom = new Classroom();
        classroom.setId(id);
        return classroom;
    }
}

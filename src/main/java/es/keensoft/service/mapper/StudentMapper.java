package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ClassroomMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.email", target = "userEmail")
    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.name", target = "studentName")
    StudentDTO toDto(Student student);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "students", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(source = "studentId", target = "student")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}

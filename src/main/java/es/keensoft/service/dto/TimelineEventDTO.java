package es.keensoft.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TimelineEvent entity.
 */
public class TimelineEventDTO implements Serializable {

    private Long id;

    private Boolean visible;

    private Long classroomId;

    private String classroomName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Long getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(Long classroomId) {
        this.classroomId = classroomId;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TimelineEventDTO timelineEventDTO = (TimelineEventDTO) o;
        if(timelineEventDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timelineEventDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimelineEventDTO{" +
            "id=" + getId() +
            ", visible='" + isVisible() + "'" +
            "}";
    }
}

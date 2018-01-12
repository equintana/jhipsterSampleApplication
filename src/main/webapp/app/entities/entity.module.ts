import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationSchoolModule } from './school/school.module';
import { JhipsterSampleApplicationTeacherModule } from './teacher/teacher.module';
import { JhipsterSampleApplicationClassroomModule } from './classroom/classroom.module';
import { JhipsterSampleApplicationReviewModule } from './review/review.module';
import { JhipsterSampleApplicationStudentModule } from './student/student.module';
import { JhipsterSampleApplicationCategoryModule } from './category/category.module';
import { JhipsterSampleApplicationFilterModule } from './filter/filter.module';
import { JhipsterSampleApplicationBookModule } from './book/book.module';
import { JhipsterSampleApplicationTimelineEventModule } from './timeline-event/timeline-event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationSchoolModule,
        JhipsterSampleApplicationTeacherModule,
        JhipsterSampleApplicationClassroomModule,
        JhipsterSampleApplicationReviewModule,
        JhipsterSampleApplicationStudentModule,
        JhipsterSampleApplicationCategoryModule,
        JhipsterSampleApplicationFilterModule,
        JhipsterSampleApplicationBookModule,
        JhipsterSampleApplicationTimelineEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}

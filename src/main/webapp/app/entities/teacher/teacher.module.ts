import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import { JhipsterSampleApplicationAdminModule } from '../../admin/admin.module';
import {
    TeacherService,
    TeacherPopupService,
    TeacherComponent,
    TeacherDetailComponent,
    TeacherDialogComponent,
    TeacherPopupComponent,
    TeacherDeletePopupComponent,
    TeacherDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute,
    TeacherResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...teacherRoute,
    ...teacherPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        JhipsterSampleApplicationAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeacherComponent,
        TeacherDetailComponent,
        TeacherDialogComponent,
        TeacherDeleteDialogComponent,
        TeacherPopupComponent,
        TeacherDeletePopupComponent,
    ],
    entryComponents: [
        TeacherComponent,
        TeacherDialogComponent,
        TeacherPopupComponent,
        TeacherDeleteDialogComponent,
        TeacherDeletePopupComponent,
    ],
    providers: [
        TeacherService,
        TeacherPopupService,
        TeacherResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTeacherModule {}

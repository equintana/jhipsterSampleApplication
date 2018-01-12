import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    ClassroomService,
    ClassroomPopupService,
    ClassroomComponent,
    ClassroomDetailComponent,
    ClassroomDialogComponent,
    ClassroomPopupComponent,
    ClassroomDeletePopupComponent,
    ClassroomDeleteDialogComponent,
    classroomRoute,
    classroomPopupRoute,
    ClassroomResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...classroomRoute,
    ...classroomPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClassroomComponent,
        ClassroomDetailComponent,
        ClassroomDialogComponent,
        ClassroomDeleteDialogComponent,
        ClassroomPopupComponent,
        ClassroomDeletePopupComponent,
    ],
    entryComponents: [
        ClassroomComponent,
        ClassroomDialogComponent,
        ClassroomPopupComponent,
        ClassroomDeleteDialogComponent,
        ClassroomDeletePopupComponent,
    ],
    providers: [
        ClassroomService,
        ClassroomPopupService,
        ClassroomResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationClassroomModule {}

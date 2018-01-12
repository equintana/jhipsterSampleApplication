import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import { JhipsterSampleApplicationAdminModule } from '../../admin/admin.module';
import {
    SchoolService,
    SchoolPopupService,
    SchoolComponent,
    SchoolDetailComponent,
    SchoolDialogComponent,
    SchoolPopupComponent,
    SchoolDeletePopupComponent,
    SchoolDeleteDialogComponent,
    schoolRoute,
    schoolPopupRoute,
    SchoolResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...schoolRoute,
    ...schoolPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        JhipsterSampleApplicationAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolComponent,
        SchoolDetailComponent,
        SchoolDialogComponent,
        SchoolDeleteDialogComponent,
        SchoolPopupComponent,
        SchoolDeletePopupComponent,
    ],
    entryComponents: [
        SchoolComponent,
        SchoolDialogComponent,
        SchoolPopupComponent,
        SchoolDeleteDialogComponent,
        SchoolDeletePopupComponent,
    ],
    providers: [
        SchoolService,
        SchoolPopupService,
        SchoolResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationSchoolModule {}

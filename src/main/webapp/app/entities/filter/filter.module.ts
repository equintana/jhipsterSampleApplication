import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FilterService,
    FilterPopupService,
    FilterComponent,
    FilterDetailComponent,
    FilterDialogComponent,
    FilterPopupComponent,
    FilterDeletePopupComponent,
    FilterDeleteDialogComponent,
    filterRoute,
    filterPopupRoute,
    FilterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...filterRoute,
    ...filterPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilterComponent,
        FilterDetailComponent,
        FilterDialogComponent,
        FilterDeleteDialogComponent,
        FilterPopupComponent,
        FilterDeletePopupComponent,
    ],
    entryComponents: [
        FilterComponent,
        FilterDialogComponent,
        FilterPopupComponent,
        FilterDeleteDialogComponent,
        FilterDeletePopupComponent,
    ],
    providers: [
        FilterService,
        FilterPopupService,
        FilterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFilterModule {}

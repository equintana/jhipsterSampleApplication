import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    TimelineEventService,
    TimelineEventPopupService,
    TimelineEventComponent,
    TimelineEventDetailComponent,
    TimelineEventDialogComponent,
    TimelineEventPopupComponent,
    TimelineEventDeletePopupComponent,
    TimelineEventDeleteDialogComponent,
    timelineEventRoute,
    timelineEventPopupRoute,
    TimelineEventResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...timelineEventRoute,
    ...timelineEventPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TimelineEventComponent,
        TimelineEventDetailComponent,
        TimelineEventDialogComponent,
        TimelineEventDeleteDialogComponent,
        TimelineEventPopupComponent,
        TimelineEventDeletePopupComponent,
    ],
    entryComponents: [
        TimelineEventComponent,
        TimelineEventDialogComponent,
        TimelineEventPopupComponent,
        TimelineEventDeleteDialogComponent,
        TimelineEventDeletePopupComponent,
    ],
    providers: [
        TimelineEventService,
        TimelineEventPopupService,
        TimelineEventResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationTimelineEventModule {}

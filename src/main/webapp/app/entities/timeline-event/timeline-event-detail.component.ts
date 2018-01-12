import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TimelineEvent } from './timeline-event.model';
import { TimelineEventService } from './timeline-event.service';

@Component({
    selector: 'jhi-timeline-event-detail',
    templateUrl: './timeline-event-detail.component.html'
})
export class TimelineEventDetailComponent implements OnInit, OnDestroy {

    timelineEvent: TimelineEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private timelineEventService: TimelineEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTimelineEvents();
    }

    load(id) {
        this.timelineEventService.find(id).subscribe((timelineEvent) => {
            this.timelineEvent = timelineEvent;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTimelineEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'timelineEventListModification',
            (response) => this.load(this.timelineEvent.id)
        );
    }
}

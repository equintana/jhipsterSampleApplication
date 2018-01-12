import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TimelineEvent } from './timeline-event.model';
import { TimelineEventPopupService } from './timeline-event-popup.service';
import { TimelineEventService } from './timeline-event.service';

@Component({
    selector: 'jhi-timeline-event-delete-dialog',
    templateUrl: './timeline-event-delete-dialog.component.html'
})
export class TimelineEventDeleteDialogComponent {

    timelineEvent: TimelineEvent;

    constructor(
        private timelineEventService: TimelineEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.timelineEventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'timelineEventListModification',
                content: 'Deleted an timelineEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-timeline-event-delete-popup',
    template: ''
})
export class TimelineEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelineEventPopupService: TimelineEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.timelineEventPopupService
                .open(TimelineEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

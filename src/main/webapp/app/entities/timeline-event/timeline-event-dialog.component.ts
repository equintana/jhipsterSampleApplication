import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TimelineEvent } from './timeline-event.model';
import { TimelineEventPopupService } from './timeline-event-popup.service';
import { TimelineEventService } from './timeline-event.service';
import { Classroom, ClassroomService } from '../classroom';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-timeline-event-dialog',
    templateUrl: './timeline-event-dialog.component.html'
})
export class TimelineEventDialogComponent implements OnInit {

    timelineEvent: TimelineEvent;
    isSaving: boolean;

    classrooms: Classroom[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private timelineEventService: TimelineEventService,
        private classroomService: ClassroomService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.classroomService
            .query({filter: 'timelineevent(id)-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.timelineEvent.classroomId) {
                    this.classrooms = res.json;
                } else {
                    this.classroomService
                        .find(this.timelineEvent.classroomId)
                        .subscribe((subRes: Classroom) => {
                            this.classrooms = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.timelineEvent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.timelineEventService.update(this.timelineEvent));
        } else {
            this.subscribeToSaveResponse(
                this.timelineEventService.create(this.timelineEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<TimelineEvent>) {
        result.subscribe((res: TimelineEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TimelineEvent) {
        this.eventManager.broadcast({ name: 'timelineEventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClassroomById(index: number, item: Classroom) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-timeline-event-popup',
    template: ''
})
export class TimelineEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelineEventPopupService: TimelineEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.timelineEventPopupService
                    .open(TimelineEventDialogComponent as Component, params['id']);
            } else {
                this.timelineEventPopupService
                    .open(TimelineEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

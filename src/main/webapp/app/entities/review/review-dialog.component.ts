import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Review } from './review.model';
import { ReviewPopupService } from './review-popup.service';
import { ReviewService } from './review.service';
import { Student, StudentService } from '../student';
import { Book, BookService } from '../book';
import { TimelineEvent, TimelineEventService } from '../timeline-event';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-review-dialog',
    templateUrl: './review-dialog.component.html'
})
export class ReviewDialogComponent implements OnInit {

    review: Review;
    isSaving: boolean;

    students: Student[];

    books: Book[];

    timelineevents: TimelineEvent[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reviewService: ReviewService,
        private studentService: StudentService,
        private bookService: BookService,
        private timelineEventService: TimelineEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.students = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bookService.query()
            .subscribe((res: ResponseWrapper) => { this.books = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.timelineEventService.query()
            .subscribe((res: ResponseWrapper) => { this.timelineevents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.review.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reviewService.update(this.review));
        } else {
            this.subscribeToSaveResponse(
                this.reviewService.create(this.review));
        }
    }

    private subscribeToSaveResponse(result: Observable<Review>) {
        result.subscribe((res: Review) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Review) {
        this.eventManager.broadcast({ name: 'reviewListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }

    trackBookById(index: number, item: Book) {
        return item.id;
    }

    trackTimelineEventById(index: number, item: TimelineEvent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-review-popup',
    template: ''
})
export class ReviewPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reviewPopupService: ReviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reviewPopupService
                    .open(ReviewDialogComponent as Component, params['id']);
            } else {
                this.reviewPopupService
                    .open(ReviewDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

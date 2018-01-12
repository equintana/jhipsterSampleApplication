import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Review } from './review.model';
import { ReviewService } from './review.service';

@Component({
    selector: 'jhi-review-detail',
    templateUrl: './review-detail.component.html'
})
export class ReviewDetailComponent implements OnInit, OnDestroy {

    review: Review;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reviewService: ReviewService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReviews();
    }

    load(id) {
        this.reviewService.find(id).subscribe((review) => {
            this.review = review;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReviews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reviewListModification',
            (response) => this.load(this.review.id)
        );
    }
}

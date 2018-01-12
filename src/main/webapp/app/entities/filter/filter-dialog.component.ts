import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Filter } from './filter.model';
import { FilterPopupService } from './filter-popup.service';
import { FilterService } from './filter.service';
import { Book, BookService } from '../book';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-filter-dialog',
    templateUrl: './filter-dialog.component.html'
})
export class FilterDialogComponent implements OnInit {

    filter: Filter;
    isSaving: boolean;

    books: Book[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private filterService: FilterService,
        private bookService: BookService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bookService.query()
            .subscribe((res: ResponseWrapper) => { this.books = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.filter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.filterService.update(this.filter));
        } else {
            this.subscribeToSaveResponse(
                this.filterService.create(this.filter));
        }
    }

    private subscribeToSaveResponse(result: Observable<Filter>) {
        result.subscribe((res: Filter) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Filter) {
        this.eventManager.broadcast({ name: 'filterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBookById(index: number, item: Book) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-filter-popup',
    template: ''
})
export class FilterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private filterPopupService: FilterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.filterPopupService
                    .open(FilterDialogComponent as Component, params['id']);
            } else {
                this.filterPopupService
                    .open(FilterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

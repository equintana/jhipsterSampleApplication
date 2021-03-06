/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BookDialogComponent } from '../../../../../../main/webapp/app/entities/book/book-dialog.component';
import { BookService } from '../../../../../../main/webapp/app/entities/book/book.service';
import { Book } from '../../../../../../main/webapp/app/entities/book/book.model';
import { CategoryService } from '../../../../../../main/webapp/app/entities/category';
import { FilterService } from '../../../../../../main/webapp/app/entities/filter';

describe('Component Tests', () => {

    describe('Book Management Dialog Component', () => {
        let comp: BookDialogComponent;
        let fixture: ComponentFixture<BookDialogComponent>;
        let service: BookService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [BookDialogComponent],
                providers: [
                    CategoryService,
                    FilterService,
                    BookService
                ]
            })
            .overrideTemplate(BookDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Book(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.book = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Book();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.book = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bookListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

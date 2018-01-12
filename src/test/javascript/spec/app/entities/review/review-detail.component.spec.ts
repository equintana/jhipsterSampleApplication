/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ReviewDetailComponent } from '../../../../../../main/webapp/app/entities/review/review-detail.component';
import { ReviewService } from '../../../../../../main/webapp/app/entities/review/review.service';
import { Review } from '../../../../../../main/webapp/app/entities/review/review.model';

describe('Component Tests', () => {

    describe('Review Management Detail Component', () => {
        let comp: ReviewDetailComponent;
        let fixture: ComponentFixture<ReviewDetailComponent>;
        let service: ReviewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ReviewDetailComponent],
                providers: [
                    ReviewService
                ]
            })
            .overrideTemplate(ReviewDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReviewDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReviewService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Review(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.review).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

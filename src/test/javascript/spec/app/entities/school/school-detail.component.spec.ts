/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SchoolDetailComponent } from '../../../../../../main/webapp/app/entities/school/school-detail.component';
import { SchoolService } from '../../../../../../main/webapp/app/entities/school/school.service';
import { School } from '../../../../../../main/webapp/app/entities/school/school.model';

describe('Component Tests', () => {

    describe('School Management Detail Component', () => {
        let comp: SchoolDetailComponent;
        let fixture: ComponentFixture<SchoolDetailComponent>;
        let service: SchoolService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SchoolDetailComponent],
                providers: [
                    SchoolService
                ]
            })
            .overrideTemplate(SchoolDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new School(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.school).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

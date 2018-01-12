import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClassroomComponent } from './classroom.component';
import { ClassroomDetailComponent } from './classroom-detail.component';
import { ClassroomPopupComponent } from './classroom-dialog.component';
import { ClassroomDeletePopupComponent } from './classroom-delete-dialog.component';

@Injectable()
export class ClassroomResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const classroomRoute: Routes = [
    {
        path: 'classroom',
        component: ClassroomComponent,
        resolve: {
            'pagingParams': ClassroomResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'classroom/:id',
        component: ClassroomDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classroomPopupRoute: Routes = [
    {
        path: 'classroom-new',
        component: ClassroomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom/:id/edit',
        component: ClassroomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom/:id/delete',
        component: ClassroomDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

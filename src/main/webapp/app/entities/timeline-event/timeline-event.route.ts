import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TimelineEventComponent } from './timeline-event.component';
import { TimelineEventDetailComponent } from './timeline-event-detail.component';
import { TimelineEventPopupComponent } from './timeline-event-dialog.component';
import { TimelineEventDeletePopupComponent } from './timeline-event-delete-dialog.component';

@Injectable()
export class TimelineEventResolvePagingParams implements Resolve<any> {

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

export const timelineEventRoute: Routes = [
    {
        path: 'timeline-event',
        component: TimelineEventComponent,
        resolve: {
            'pagingParams': TimelineEventResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.timelineEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'timeline-event/:id',
        component: TimelineEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.timelineEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timelineEventPopupRoute: Routes = [
    {
        path: 'timeline-event-new',
        component: TimelineEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.timelineEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timeline-event/:id/edit',
        component: TimelineEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.timelineEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timeline-event/:id/delete',
        component: TimelineEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.timelineEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

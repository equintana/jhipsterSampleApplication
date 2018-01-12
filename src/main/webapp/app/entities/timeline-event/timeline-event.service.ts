import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TimelineEvent } from './timeline-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TimelineEventService {

    private resourceUrl =  SERVER_API_URL + 'api/timeline-events';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/timeline-events';

    constructor(private http: Http) { }

    create(timelineEvent: TimelineEvent): Observable<TimelineEvent> {
        const copy = this.convert(timelineEvent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(timelineEvent: TimelineEvent): Observable<TimelineEvent> {
        const copy = this.convert(timelineEvent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TimelineEvent> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TimelineEvent.
     */
    private convertItemFromServer(json: any): TimelineEvent {
        const entity: TimelineEvent = Object.assign(new TimelineEvent(), json);
        return entity;
    }

    /**
     * Convert a TimelineEvent to a JSON which can be sent to the server.
     */
    private convert(timelineEvent: TimelineEvent): TimelineEvent {
        const copy: TimelineEvent = Object.assign({}, timelineEvent);
        return copy;
    }
}

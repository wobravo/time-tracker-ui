import {TimeEntriesSummary} from '../models/time.entry.summary';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from './../../../../environments/environment';
import {TimeEntriesTimeRange} from '../models/time-entries-time-range';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EntryService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  static TIME_ENTRIES_DATE_TIME_FORMAT = 'yyyy-MM-ddThh:mm:ssZZZZZ';
  baseUrl = `${environment.timeTrackerApiUrl}/time-entries`;

  loadActiveEntry(): Observable<any> {
    return this.http.get(`${this.baseUrl}/running`);
  }

  loadEntries(month): Observable<any> {
    return this.http.get(`${this.baseUrl}?month=${month}`);
  }

  createEntry(entryData): Observable<any> {
    return this.http.post(this.baseUrl, entryData);
  }

  updateActiveEntry(entryData): Observable<any> {
    const {id} = entryData;
    return this.http.put(`${this.baseUrl}/${id}`, entryData);
  }

  deleteEntry(entryId: string): Observable<any> {
    const url = `${this.baseUrl}/${entryId}`;
    return this.http.delete(url);
  }

  stopEntryRunning(idEntry: string): Observable<any> {
    const url = `${this.baseUrl}/${idEntry}/stop`;
    return this.http.post(url, null);
  }

  summary(): Observable<TimeEntriesSummary> {
    const summaryUrl = `${this.baseUrl}/summary`;
    return this.http.get<TimeEntriesSummary>(summaryUrl);
  }

  loadEntriesByTimeRange(range: TimeEntriesTimeRange): Observable<any> {
    return this.http.get(this.baseUrl,
      {
        params: {
          start_date: this.datePipe.transform(range.start_date, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT),
          end_date: this.datePipe.transform(range.end_date, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT)
        }
      }
    );
  }
}

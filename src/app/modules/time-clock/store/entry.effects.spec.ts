import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {EntryEffects} from './entry.effects';
import {Observable, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrModule} from 'ngx-toastr';
import {Action} from '@ngrx/store';
import {DatePipe} from '@angular/common';
import {EntryActionTypes} from './entry.actions';
import {EntryService} from '../services/entry.service';
import {TimeEntriesTimeRange} from '../models/time-entries-time-range';

describe('TimeEntryActionEffects', () => {

  let actions$: Observable<Action>;
  let effects: EntryEffects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePipe,
        EntryEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: []
    });
    effects = TestBed.inject(EntryEffects);
    service = TestBed.inject(EntryService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('When the service returns a value, then LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS should be triggered', async () => {
    const timeRange: TimeEntriesTimeRange = {start_date: new Date(), end_date: new Date()};
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange});
    const serviceSpy = spyOn(service, 'loadEntriesByTimeRange');
    serviceSpy.and.returnValue(of([]));

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS);
    });

    expect(service.loadEntriesByTimeRange).toHaveBeenCalledWith(timeRange);
  });

  it('When the service fails, then LOAD_ENTRIES_BY_TIME_RANGE_FAIL should be triggered', async () => {
    const timeRange: TimeEntriesTimeRange = {start_date: new Date(), end_date: new Date()};
    actions$ = of({type: EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE, timeRange});
    const serviceSpy = spyOn(service, 'loadEntriesByTimeRange');
    serviceSpy.and.throwError('error getting time entries');

    effects.loadEntriesByTimeRange$.subscribe(action => {
      expect(action.type).toEqual(EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL);
    });

    expect(service.loadEntriesByTimeRange).toHaveBeenCalledWith(timeRange);
  });

  // TODO Implement the remaining unit tests for the other effects.

});
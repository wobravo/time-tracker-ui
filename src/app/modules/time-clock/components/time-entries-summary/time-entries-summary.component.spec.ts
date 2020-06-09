import { interval } from 'rxjs';
import { EntryActionTypes } from './../../store/entry.actions';
import { EntryState } from './../../store/entry.reducer';
import { TimeDetailsPipe } from './../../pipes/time-details.pipe';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TimeEntriesSummary } from './../../models/time.entry.summary';
import { TimeDetails } from './../../models/time.entry.summary';
import { async, ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { TimeEntriesSummaryComponent } from './time-entries-summary.component';
import { ActionsSubject } from '@ngrx/store';

describe('TimeEntriesSummaryComponent', () => {
  let component: TimeEntriesSummaryComponent;
  let fixture: ComponentFixture<TimeEntriesSummaryComponent>;
  let store: MockStore<EntryState>;

  const emptyTimeDetails: TimeDetails = { hours: '--:--', minutes: '--:--', seconds: '--:--' };
  const emptyTimeEntriesSummary: TimeEntriesSummary = { day: emptyTimeDetails, week: emptyTimeDetails, month: emptyTimeDetails };

  const timeTwoHoursBehind = new Date();
  timeTwoHoursBehind.setHours(timeTwoHoursBehind.getHours() - 2);
  const actionSub: ActionsSubject = new ActionsSubject();

  const timeEntry = {
    id: '123',
    start_date: timeTwoHoursBehind,
    end_date: null,
    activity_id: '123',
    technologies: ['react', 'redux'],
    comments: 'any comment',
    uri: 'custom uri',
    project_id: '123'
  };

  const state = {
    active: timeEntry,
    entryList: [timeEntry],
    entries: [timeEntry],
    isLoading: false,
    message: '',
    createError: false,
    updateError: false,
    timeEntriesSummary: emptyTimeEntriesSummary,
    entriesForReport: [timeEntry],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntriesSummaryComponent, TimeDetailsPipe ],
      providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(state);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  const params = [
    { actionType: EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL },
    { actionType: EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS },
    { actionType: EntryActionTypes.CREATE_ENTRY_SUCCESS },
  ];

  params.map((param) => {
    it(`calls blankCurrentWorkingTime when ${param.actionType}`, () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
      };
      spyOn(component, 'blankCurrentWorkingTime');

      actionSubject.next(action);

      expect(component.blankCurrentWorkingTime).toHaveBeenCalled();
    });
  });

  it('sets destroyed to false when timeInterval is not null', () => {
    spyOn(component.destroyed$, 'next');
    component.timeInterval = interval(1).subscribe();

    component.updateCurrentWorkingHours(timeEntry);

    expect(component.destroyed$.next).toHaveBeenCalledWith(false);
  });

  it('does not change currentWorkingTime if entry is null', () => {
    const initialWorkingTime = 'foo';
    component.currentWorkingTime = initialWorkingTime;

    component.updateCurrentWorkingHours(null);

    expect(component.currentWorkingTime).toBe(initialWorkingTime);
  });

  it('sets --:-- to currentWorkingTime', () => {
    component.blankCurrentWorkingTime();

    expect(component.currentWorkingTime).toBe('--:--');
  });

  it('calls updateCurrentWorkingHours when LOAD_ACTIVE_ENTRY_SUCCESS', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS,
      payload: timeEntry
    };
    spyOn(component, 'updateCurrentWorkingHours');

    actionSubject.next(action);

    expect(component.updateCurrentWorkingHours).toHaveBeenCalledWith(timeEntry);
  });

  it('dispatches two actions on ngOnInit', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('runs the time on updateCurrentWorkingHours', fakeAsync(() => {
    component.updateCurrentWorkingHours(timeEntry);

    tick(1100);
    fixture.detectChanges();

    const elapsedTime = component.currentWorkingTime;
    const isElapsedTimeAtLeastTwoHours = elapsedTime.startsWith('02:00');
    expect(isElapsedTimeAtLeastTwoHours).toBe(true);
    discardPeriodicTasks();
  }));

});

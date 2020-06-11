import {TimeDetails, TimeEntriesSummary} from '../models/time.entry.summary';
import {Entry, NewEntry} from './../../shared/models';
import * as actions from './entry.actions';
import {entryReducer, EntryState} from './entry.reducer';

describe('entryReducer', () => {

  const emptyTimeDetails: TimeDetails = {hours: '--:--', minutes: '--:--', seconds: '--:--'};
  const emptyTimeEntriesSummary: TimeEntriesSummary = {day: emptyTimeDetails, week: emptyTimeDetails, month: emptyTimeDetails};


  const initialState: EntryState = {
    active: null,
    entryList: [],
    isLoading: false,
    message: '',
    createError: null,
    updateError: null,
    timeEntriesSummary: emptyTimeEntriesSummary,
    entriesForReport: []
  };

  const newEntry: NewEntry = {
    start_date: 'start-date',
    description: 'description',
    project_id: '112',
    technologies: ['angular', 'typescript'],
  };

  const entry: Entry = {
    project_id: '123',
    description: 'description',
    technologies: ['angular', 'javascript'],
    uri: 'uri',
    id: 'id',
    start_date: new Date(),
    end_date: new Date(),
    activity_id: 'activity',
  };

  const entriesList: Entry[] = [entry];

  it('sets timeEntriesSummary from action on LOAD_ENTRIES_SUMMARY_SUCCESS', () => {
    const payload = null;
    const action = new actions.LoadEntriesSummarySuccess(payload);
    const state = entryReducer(initialState, action);
    expect(state.timeEntriesSummary).toBe(payload);
  });

  it('sets message on LOAD_ACTIVE_ENTRY_FAIL', () => {
    const action = new actions.LoadActiveEntryFail('');
    const state = entryReducer(initialState, action);
    expect(state.message).toBe('Something went wrong fetching active entry!');
  });

  it('sets timeEntriesSummary as empty on LOAD_ENTRIES_SUMMARY_FAIL', () => {
    const action = new actions.LoadEntriesSummaryFail();
    const state = entryReducer(initialState, action);
    expect(state.timeEntriesSummary).toEqual(emptyTimeEntriesSummary);
  });

  it('on LOAD_ENTRIES_SUMMARY, is Loading true', () => {
    const action = new actions.LoadEntriesSummary();
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('on Default, ', () => {
    const action = new actions.DefaultEntry();
    const state = entryReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('on LoadActiveEntry, isLoading is true', () => {
    const action = new actions.LoadActiveEntry();
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadActiveEntrySuccess, activeEntryFound are saved in the store', () => {
    const activeEntryFound: NewEntry[] = [
      {project_id: '123', description: 'description', technologies: ['angular', 'javascript'], activity_id: 'xyz'},
    ];
    const action = new actions.LoadActiveEntrySuccess(activeEntryFound);
    const state = entryReducer(initialState, action);
    expect(state.active).toEqual(activeEntryFound);
  });

  it('on LoadActiveEntryFail, active tobe null', () => {
    const action = new actions.LoadActiveEntryFail('error');
    const state = entryReducer(initialState, action);
    expect(state.active).toBe(null);
    expect(state.message).toEqual('Something went wrong fetching active entry!');
  });

  it('on LoadEntries, isLoading is true', () => {
    const action = new actions.LoadEntries(new Date().getMonth() + 1);
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on LoadEntriesSuccess, get all Entries', () => {
    const action = new actions.LoadEntriesSuccess(entriesList);

    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual(entriesList);
  });

  it('on LoadEntriesFail, active tobe null', () => {
    const action = new actions.LoadEntriesFail('error');
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on CreateEntry, isLoading is true', () => {
    const entryToCreate: NewEntry = {project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00'};
    const action = new actions.CreateEntry(entryToCreate);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateEntrySuccess, message is updated', () => {
    const entryToCreate: NewEntry = {project_id: '1', start_date: '2020-04-21T19:51:36.559000+00:00'};
    const action = new actions.CreateEntrySuccess(entryToCreate);
    const state = entryReducer(initialState, action);

    expect(state.message).toEqual('You clocked-in successfully');
  });

  it('on CreateEntryFail, entryList equal []', () => {
    const action = new actions.CreateEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.entryList).toEqual([]);
    expect(state.isLoading).toEqual(false);
  });

  it('on DeleteEntry by Id, isLoading is true', () => {
    const action = new actions.DeleteEntry('id');
    const state = entryReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on DeleteEntrySuccess', () => {
    const currentState = {...initialState, entryList: entriesList};
    const action = new actions.DeleteEntrySuccess('id');

    const state = entryReducer(currentState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on LoadEntriesFail, active tobe null', () => {
    const action = new actions.DeleteEntryFail('error');
    const state = entryReducer(initialState, action);
    expect(state.entryList).toEqual([]);
  });

  it('on UpdateActiveEntry, isLoading is true', () => {
    const action = new actions.UpdateEntry(newEntry);
    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateActiveEntrySuccess, loading is false', () => {
    const action = new actions.UpdateEntrySuccess(entry);

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
  });

  it('on cleanEntryCreateError, createError to be null', () => {
    const action = new actions.CleanEntryCreateError(null);
    const state = entryReducer(initialState, action);

    expect(state.createError).toBe(null);
  });

  it('on cleanEntryUpdateError, updateError to be null', () => {
    const action = new actions.CleanEntryUpdateError(null);
    const state = entryReducer(initialState, action);

    expect(state.updateError).toBe(null);
  });

  it('on UpdateActiveEntryFail, active to be null', () => {
    const action = new actions.UpdateEntryFail('error');
    const state = entryReducer(initialState, action);

    expect(state.active).toBe(null);
    expect(state.isLoading).toEqual(false);
  });

  it('on StopTimeEntryRunning, is loading false', () => {
    const action = new actions.StopTimeEntryRunning('id');

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on StopTimeEntryRunningSuccess, active is null and message is updated', () => {
    const action = new actions.StopTimeEntryRunningSuccess('id');

    const state = entryReducer(initialState, action);

    expect(state.active).toEqual(null);
    expect(state.message).toEqual('You clocked-out successfully');
  });

  it('on UpdateActiveEntryFail, isLoading is false', () => {
    const action = new actions.StopTimeEntryRunningFail('id');

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toBeFalsy();
  });

  it('on LoadEntriesByTimeRange, the state has isLoading is true', () => {
    const action = new actions.LoadEntriesByTimeRange(null);

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toBeTrue();
  });

  it('on LoadEntriesByTimeRangeSuccess, the entriesForReport is populated with the payload info from the action', () => {
    const payload = entriesList;
    const action = new actions.LoadEntriesByTimeRangeSuccess(payload);

    const state = entryReducer(initialState, action);

    expect(state.entriesForReport).toEqual(payload);
  });

  it('on LoadEntriesByTimeRangeFail, the state has isLoading is false and the entriesForReport is an empty array ', () => {
    const action = new actions.LoadEntriesByTimeRangeFail();

    const state = entryReducer(initialState, action);

    expect(state.isLoading).toBeFalse();
    expect(state.entriesForReport).toEqual([]);
  });
});

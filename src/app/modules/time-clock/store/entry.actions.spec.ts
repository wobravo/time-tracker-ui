import * as actions from './entry.actions';
import * as moment from 'moment';
import { TimeEntriesTimeRange } from '../models/time-entries-time-range';

describe('Actions for Entries', () => {


  it('SwitchTimeEntry type is EntryActionTypes.SWITCH_TIME_ENTRY', () => {
    const action = new actions.SwitchTimeEntry('entry-id', 'project-id');
    expect(action.type).toEqual(actions.EntryActionTypes.SWITCH_TIME_ENTRY);
  });

  it('SwitchTimeEntryFail type is EntryActionTypes.SWITCH_TIME_ENTRY_FAIL', () => {
    const action = new actions.SwitchTimeEntryFail('error msg');
    expect(action.type).toEqual(actions.EntryActionTypes.SWITCH_TIME_ENTRY_FAIL);
  });

  it('LoadEntriesSummaryFail type is EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL', () => {
    const action = new actions.LoadEntriesSummaryFail();
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUMMARY_FAIL);
  });

  it('LoadEntriesSummarySuccess type is EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS', () => {
    const action = new actions.LoadEntriesSummarySuccess(null);
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUMMARY_SUCCESS);
  });

  it('LoadActiveEntrySuccess type is EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS', () => {
    const loadActiveEntrySuccess = new actions.LoadActiveEntrySuccess([]);
    expect(loadActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS);
  });

  it('LoadActiveEntryFail type is EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL', () => {
    const loadActiveEntryFail = new actions.LoadActiveEntryFail('error');
    expect(loadActiveEntryFail.type).toEqual(actions.EntryActionTypes.LOAD_ACTIVE_ENTRY_FAIL);
  });

  it('LoadEntriesSuccess type is EntryActionTypes.LOAD_ENTRIES_SUCCESS', () => {
    const loadEntrySuccess = new actions.LoadEntriesSuccess([]);
    expect(loadEntrySuccess.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_SUCCESS);
  });

  it('LoadEntriesFail type is EntryActionTypes.LOAD_ENTRIES_FAIL', () => {
    const loadEntryFail = new actions.LoadEntriesFail('error');
    expect(loadEntryFail.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_FAIL);
  });

  it('CreateEntrySuccess type is EntryActionTypes.CREATE_ENTRY_SUCCESS', () => {
    const createEntrySuccess = new actions.CreateEntrySuccess(null);
    expect(createEntrySuccess.type).toEqual(actions.EntryActionTypes.CREATE_ENTRY_SUCCESS);
  });

  it('CreateEntryFail type is EntryActionTypes.CREATE_ENTRY_FAIL', () => {
    const createEntryFail = new actions.CreateEntryFail('error');
    expect(createEntryFail.type).toEqual(actions.EntryActionTypes.CREATE_ENTRY_FAIL);
  });

  it('DeleteEntrySuccess type is EntryActionTypes.DELETE_ENTRY_SUCCESS', () => {
    const deleteEntrySuccess = new actions.DeleteEntrySuccess('entryId');
    expect(deleteEntrySuccess.type).toEqual(actions.EntryActionTypes.DELETE_ENTRY_SUCCESS);
  });

  it('DeleteEntrySuccess type is EntryActionTypes.DELETE_ENTRY_SUCCESS', () => {
    const deleteEntryFail = new actions.DeleteEntryFail('error');
    expect(deleteEntryFail.type).toEqual(actions.EntryActionTypes.DELETE_ENTRY_FAIL);
  });

  it('UpdateEntrySuccess type is EntryActionTypes.UDPATE_ENTRY_SUCCESS', () => {
    const updateActiveEntrySuccess = new actions.UpdateEntrySuccess({
      id: '1',
      start_date: new Date(),
      end_date: new Date(),
      activity_id: '',
      technologies: ['abc', 'abc'],
    });
    expect(updateActiveEntrySuccess.type).toEqual(actions.EntryActionTypes.UPDATE_ENTRY_SUCCESS);
  });

  it('UpdateEntryFail type is EntryActionTypes.UDPATE_ENTRY_FAIL', () => {
    const updateActiveEntryFail = new actions.UpdateEntryFail('error');
    expect(updateActiveEntryFail.type).toEqual(actions.EntryActionTypes.UPDATE_ENTRY_FAIL);
  });

  it('UpdateActiveEntry type is EntryActionTypes.UDPATE_ENTRY_FAIL', () => {
    const action = new actions.UpdateEntryRunning({
        id: '1',
        start_date: new Date(),
        end_date: new Date(),
        activity_id: '',
        technologies: ['abc', 'abc'],
      });
    expect(action.type).toEqual(actions.EntryActionTypes.UPDATE_ENTRY_RUNNING);
  });

  it('LoadEntriesByTimeRange type is EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE', () => {
    const yesterday = moment(new Date()).subtract(1, 'day');
    const today = moment(new Date());
    const timeRange: TimeEntriesTimeRange = {start_date: yesterday, end_date: today};
    const action = new actions.LoadEntriesByTimeRange(timeRange);
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE);
    expect(action.timeRange).toEqual(timeRange);
    expect(action.userId).toEqual('*');
  });

  it('LoadEntriesByTimeRangeSuccess type is EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS', () => {
    const action = new actions.LoadEntriesByTimeRangeSuccess(null);
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_SUCCESS);
  });

  it('LoadEntriesByTimeRangeFail type is EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL', () => {
    const action = new actions.LoadEntriesByTimeRangeFail();
    expect(action.type).toEqual(actions.EntryActionTypes.LOAD_ENTRIES_BY_TIME_RANGE_FAIL);
  });
});

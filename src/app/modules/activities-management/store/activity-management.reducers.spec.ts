import { Activity } from './../../shared/models/activity.model';
import * as actions from './activity-management.actions';
import { activityManagementReducer, ActivityState } from './activity-management.reducers';

describe('activityManagementReducer', () => {
  const initialState: ActivityState = { data: [], isLoading: false, message: '', activityIdToEdit: '' };
  const activity: Activity = { id: '1', name: 'Training', description: 'It is good for learning' };

  it('on LoadActivities, isLoading is true', () => {
    const action = new actions.LoadActivities();

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadActivitiesSuccess, activitiesFound are saved in the store', () => {
    const activitiesFound: Activity[] = [{ id: '', name: '', description: '' }];
    const action = new actions.LoadActivitiesSuccess(activitiesFound);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual(activitiesFound);
  });

  it('on LoadActivitiesFail, message equal to Something went wrong fetching activities!', () => {
    const action = new actions.LoadActivitiesFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong fetching activities!');
  });

  it('on CreateActivity, isLoading is true', () => {
    const action = new actions.CreateActivity(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateActivitySuccess, activitiesFound are saved in the store', () => {
    const action = new actions.CreateActivitySuccess(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.data).toEqual([activity]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateActivityFail, message equal to Something went wrong creating activities!', () => {
    const action = new actions.CreateActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong creating activities!');
    expect(state.isLoading).toEqual(false);
  });

  it('on DeleteActivity, isLoading is true', () => {
    const activityToDeleteId = '1';
    const action = new actions.DeleteActivity(activityToDeleteId);

    const state = activityManagementReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });

  it('on DeleteActivitySuccess, message equal to Activity removed successfully!', () => {
    const currentState: ActivityState = { data: [activity], isLoading: false, message: '', activityIdToEdit: '' };
    const activityToDeleteId = '1';
    const action = new actions.DeleteActivitySuccess(activityToDeleteId);

    const state = activityManagementReducer(currentState, action);
    expect(state.data).toEqual([]);
    expect(state.message).toEqual('Activity removed successfully!');
  });

  it('on DeleteActivityFail, message equal to Something went wrong deleting activity!', () => {
    const activityToDeleteId = '1';
    const action = new actions.DeleteActivityFail(activityToDeleteId);

    const state = activityManagementReducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Something went wrong deleting activity!');
  });

  it('on UpdateActivity, isLoading is true', () => {
    const action = new actions.UpdateActivity(activity);

    const state = activityManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateActivitySuccess, activitiesFound are saved in the store', () => {
    const currentState: ActivityState = { data: [activity], isLoading: false, message: '', activityIdToEdit: '1' };
    const activityEdited: Activity = { id: '1', name: 'Test', description: 'edit test' };

    const action = new actions.UpdateActivitySuccess(activityEdited);

    const state = activityManagementReducer(currentState, action);

    expect(state.data).toEqual([activityEdited]);
    expect(state.isLoading).toEqual(false);
  });

  it('on UpdateActivityFail, message equal to Something went wrong creating activities!', () => {
    const action = new actions.UpdateActivityFail('error');

    const state = activityManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong updating activities!');
    expect(state.isLoading).toEqual(false);
  });

  it('on SetActivityToEdit, should save the activityId to edit', () => {
    const action = new actions.SetActivityToEdit(activity.id);

    const state = activityManagementReducer(initialState, action);

    expect(state.activityIdToEdit).toEqual('1');
  });

  it('on ResetActivityToEdit, should clean the activityIdToEdit variable', () => {
    const action = new actions.ResetActivityToEdit();

    const state = activityManagementReducer(initialState, action);

    expect(state.activityIdToEdit).toEqual('');
  });
});

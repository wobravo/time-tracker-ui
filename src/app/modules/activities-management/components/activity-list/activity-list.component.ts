import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoadActivities, DeleteActivity, SetActivityToEdit } from './../../store/activity-management.actions';
import { ActivityState } from './../../store/activity-management.reducers';
import { allActivities } from '../../store';
import { Activity } from '../../../shared/models';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getIsLoading } from 'src/app/modules/activities-management/store/activity-management.selectors';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];
  showModal = false;
  activityToDelete: Activity;
  message: string;
  idToDelete: string;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<ActivityState>) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
  }

  ngOnInit() {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));

    activities$.subscribe((response) => {
      this.activities = response;
    });
  }

  deleteActivity() {
    this.store.dispatch(new DeleteActivity(this.idToDelete));
    this.showModal = true;
  }

  updateActivity(activityId: string) {
    this.store.dispatch(new SetActivityToEdit(activityId));
  }

  openModal(item: Activity) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.name}?`;
    this.showModal = true;
  }
}

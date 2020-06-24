import { filter } from 'rxjs/operators';
import { getActiveTimeEntry } from './../store/entry.selectors';
import { StopTimeEntryRunning, EntryActionTypes, LoadEntriesSummary } from './../store/entry.actions';
import { Entry } from './../../shared/models/entry.model';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit, OnDestroy {
  username: string;
  areFieldsVisible = false;
  activeTimeEntry: Entry;
  clockOutSubscription: Subscription;

  constructor(private azureAdB2CService: AzureAdB2CService, private store: Store<Entry>,
              private actionsSubject$: ActionsSubject) {
  }

  ngOnDestroy(): void {
    this.clockOutSubscription.unsubscribe();
  }

  ngOnInit() {
    this.username = this.azureAdB2CService.isLogin() ? this.azureAdB2CService.getName() : '';
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      this.activeTimeEntry = activeTimeEntry;
      if (this.activeTimeEntry) {
        this.areFieldsVisible = true;
      } else {
        this.areFieldsVisible = false;
      }
    });

    this.reloadSummariesOnClockOut();

  }

  reloadSummariesOnClockOut() {
    this.clockOutSubscription = this.actionsSubject$.pipe(
      filter((action) => (
          action.type === EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS
        )
      )
    ).subscribe( (action) => {
      this.store.dispatch(new LoadEntriesSummary());
    });
  }

  clockOut() {
    this.store.dispatch(new StopTimeEntryRunning(this.activeTimeEntry.id));
    this.areFieldsVisible = false;
  }
}

import { formatDate } from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import {entriesForReport} from '../../../time-clock/store/entry.selectors';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {

  data = [];
  const;
  dtOptions: any = {
    scrollY: '600px',
    paging: false,
    dom: 'Bfrtip',
    buttons: [
      'colvis',
      'print',
      {
        extend: 'excel',
        text: 'Excel',
        filename: `time-entries-${ formatDate(new Date(), 'yyyy_MM_dd-hh_mm', 'en') }`
      },
      {
        extend: 'csv',
        text: 'CSV',
        filename: `time-entries-${ formatDate(new Date(), 'yyyy_MM_dd-hh_mm', 'en') }`
      }
    ]
  };

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private store: Store<EntryState>) {
  }

  ngOnInit(): void {
    const dataForReport$ = this.store.pipe(select(entriesForReport));
    dataForReport$.subscribe((response) => {
      this.data = response;
      this.rerenderDataTable();
    });
  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private rerenderDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }
}

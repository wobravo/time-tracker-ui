import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MonthPickerComponent,
  DetailsFieldsComponent,
  EmptyStateComponent,
  ModalComponent,
} from '../../shared/components';
import { GroupByDatePipe } from '../../shared/pipes';
import { TimeEntriesComponent } from './time-entries.component';

describe('TimeEntriesComponent', () => {
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  const entry = {
    id: 'entry_1',
    project: 'Mido - 05 de Febrero',
    startDate: '2020-02-05T15:36:15.887Z',
    endDate: '2020-02-05T18:36:15.887Z',
    activity: 'development',
    technology: 'Angular, TypeScript',
    comments: 'No comments',
    ticket: 'EY-25',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmptyStateComponent,
        DetailsFieldsComponent,
        GroupByDatePipe,
        ModalComponent,
        MonthPickerComponent,
        TimeEntriesComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataByMonth in ngOnInit()', async(() => {
    component.ngOnInit();
    expect(component.dataByMonth.length).toEqual(1);
  }));

  it('should open Delete Modal', () => {
    component.openModal(entry);
    expect(component.entryToDelete).toBe(entry);
    expect(component.showModal).toBe(true);
  });

  it('should filter the Entry to edit', () => {
    const entryId = 'entry_1';
    component.editEntry(entryId);
    expect(component.entry.project).toBe(entry.project);
    expect(component.entry.startDate).toBe(entry.startDate);
    expect(component.entry.endDate).toBe(entry.endDate);
    expect(component.entry.activity).toBe(entry.activity);
    expect(component.entry.technology).toBe(entry.technology);
  });

  it('should save an Entry', () => {
    component.entryId = 'entry_1';
    component.saveEntry(entry);
    expect(component.entryList[0].project).toBe('Mido - 05 de Febrero');
    expect(component.entryList[0].startDate).toBe('2020-02-05T15:36:15.887Z');
    expect(component.entryList[0].endDate).toBe('2020-02-05T18:36:15.887Z');
    expect(component.entryList[0].activity).toBe('development');
    expect(component.entryList[0].technology).toBe('Angular, TypeScript');
  });

  it('should delete a Entry', () => {
    const entryId = 'entry_5';
    component.removeEntry(entryId);
    expect(component.dataByMonth.length).toBe(0);
  });

  it('should get the entry List by Month', () => {
    const month = 3;
    component.getMonth(month);
    expect(component.dataByMonth.length).toEqual(1);
  });
});

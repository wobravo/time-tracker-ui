import { EntryActionTypes } from './../../../time-clock/store/entry.actions';
import { TechnologiesComponent } from './../technologies/technologies.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActionsSubject } from '@ngrx/store';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

import { TechnologyState } from '../../store/technology.reducers';
import { allTechnologies } from '../../store/technology.selectors';
import { DetailsFieldsComponent } from './details-fields.component';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { getCreateError, getUpdateError } from 'src/app/modules/time-clock/store/entry.selectors';
import { SaveEntryEvent } from './save-entry-event';
import * as moment from 'moment';

describe('DetailsFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState & EntryState;
  let component: DetailsFieldsComponent;
  let fixture: ComponentFixture<DetailsFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let mockEntriesUpdateErrorSelector;
  let mockEntriesCreateErrorSelector;
  let entryToEdit;
  let formValues;
  const actionSub: ActionsSubject = new ActionsSubject();
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '' }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    technologies: {
      technologyList: { items: [{ name: 'java' }] },
      isLoading: false,
    },
    activities: {
      data: [{ id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', deleted: null, name: 'abc' }],
      isLoading: false,
      message: 'Data fetch successfully!',
      activityIdToEdit: '',
    },
    Entries: {
      createError: null,
      updateError: null,
    },
  };

  const initialData = {
    project_id: '',
    activity_id: '',
    uri: '',
    entry_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    start_hour: '00:00:00',
    end_hour: '00:00:00',
    description: '',
    technology: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldsComponent, TechnologiesComponent],
      providers: [
        provideMockStore({ initialState: state }),
        { provide: ActionsSubject, useValue: actionSub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
    mockEntriesUpdateErrorSelector = store.overrideSelector(getUpdateError, state.Entries.updateError);
    mockEntriesCreateErrorSelector = store.overrideSelector(getCreateError, state.Entries.createError);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFieldsComponent);
    component = fixture.componentInstance;
    entryToEdit = {
      project_id: '',
      activity_id: '',
      uri: 'ticketUri',
      start_date: null,
      end_date: null,
      description: '',
      technologies: [],
      id: 'xyz'
    };
    formValues = {
      project_id: 'p1',
      activity_id: 'a1',
      uri: 'ticketUri',
      entry_date: '',
      start_hour: '00:00:10',
      end_hour: '00:00:11',
      description: '',
      technology: '',
    };
    component.canMarkEntryAsWIP = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if form is invalid then no save is emited', () => {
    spyOn(component.saveEntry, 'emit');

    component.onSubmit();

    expect(component.saveEntry.emit).toHaveBeenCalledTimes(0);
  });

  [
    { actionType: EntryActionTypes.CREATE_ENTRY_SUCCESS },
    { actionType: EntryActionTypes.UPDATE_ENTRY_SUCCESS },
  ].map((param) => {
    it(`cleanForm after an action type ${param.actionType} is received`, () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
      };
      spyOn(component, 'cleanForm');

      component.ngOnInit();
      actionSubject.next(action);

      expect(component.cleanForm).toHaveBeenCalled();
    });
  });

  it('should emit ngOnChange without data', () => {
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(initialData);
  });

  it('should emit ngOnChange with new data', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    const formValue = {
      project_id: '',
      activity_id: '',
      uri: '',
      entry_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      start_hour: '00:00:00',
      end_hour: '00:00:00',
      description: '',
      technology: '',
    };
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(formValue);
  });

  it('should call createError ', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    mockEntriesCreateErrorSelector = store.overrideSelector(getCreateError, false);
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CleanEntryCreateError(null));
  });

  it('should call updateError ', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    mockEntriesUpdateErrorSelector = store.overrideSelector(getUpdateError, false);
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CleanEntryUpdateError(null));
  });

  it('should emit saveEntry event', () => {
    spyOn(component.saveEntry, 'emit');
    component.entryForm.setValue({
      project_id: 'p1',
      activity_id: 'a1',
      uri: '',
      entry_date: '2020-02-05',
      start_hour: '00:00:01',
      end_hour: '00:01:01',
      description: '',
      technology: '',
    });

    component.onSubmit();

    const data: SaveEntryEvent = {
      entry: {
        project_id: 'p1',
        activity_id: 'a1',
        technologies: [],
        description: '',
        start_date: new Date('2020-02-05T00:00:01').toISOString(),
        end_date: new Date('2020-02-05T00:01:01').toISOString(),
        uri: ''
      },
      shouldRestartEntry: false
    };
    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('when the current entry is not running, then the end hour input should be rendered', () => {
    component.goingToWorkOnThis = false;
    fixture.detectChanges();

    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');
    expect(endHourInput).toBeDefined();
  });

  it('when  the current entry is running, then the end hour input should not be rendered', () => {
    component.goingToWorkOnThis = true;
    fixture.detectChanges();

    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');
    expect(endHourInput).toBeNull();
  });

  it('when creating a new entry, then the new entry should be marked as not run', () => {
    component.entryToEdit = null;

    expect(component.goingToWorkOnThis).toBeFalse();
  });

  it('when editing entry that is currently running, then the entry should be marked as I am working on this', () => {
    component.entryToEdit = { ...entryToEdit, running: true };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeTrue();
  });

  it('when editing entry that already finished, then the entry should not be marked as running', () => {
    component.entryToEdit = { ...entryToEdit, running: false };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeFalse();
  });

  it('when editing entry that already finished, then the entry should not be marked as running', () => {
    component.entryToEdit = { ...entryToEdit, running: false };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeFalse();
  });

  it('when submitting a entry that is currently running, the end date should not be sent ', () => {
    component.goingToWorkOnThis = true;
    spyOn(component.saveEntry, 'emit');

    component.entryForm.setValue({ ...formValues, entry_date: '2020-06-11' });

    component.onSubmit();

    const data: SaveEntryEvent = {
      entry: {
        project_id: 'p1',
        activity_id: 'a1',
        technologies: [],
        description: '',
        start_date: new Date('2020-06-11T00:00:10').toISOString(),
        uri: 'ticketUri',
      },
      shouldRestartEntry: false
    };

    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('displays error message when the date selected is in the future', () => {
    spyOn(toastrServiceStub, 'error');

    const futureDate = moment().add(1, 'days').format('YYYY-MM-DD');
    component.entryForm.setValue({ ...formValues, entry_date: futureDate });
    component.onSubmit();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  /*
   TODO As part of https://github.com/ioet/time-tracker-ui/issues/424 a new parameter was added to the details-field-component,
   and now these couple of tests are failing. A solution to this error might be generate a Test Wrapper Component. More details here:
   https://medium.com/better-programming/testing-angular-components-with-input-3bd6c07cfaf6
  */

  //   it('when disabling going to work on this, then the end hour should be set to the current time', () => {
  //     const datePipe: DatePipe = new DatePipe('en');
  //     const currentTime = datePipe.transform(new Date(), 'HH:mm:ss');
  //     const checkIsEntryRunning: Element = fixture.debugElement.nativeElement.querySelector('#isEntryRunning');
  //     checkIsEntryRunning.dispatchEvent(new Event('change'));
  //     fixture.detectChanges();

  //     const endHourInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#end_hour');
  //     expect(endHourInput.value).toEqual(currentTime);
  //   });

  //   it('given going to work on this and the entry is not currently running, when submitting
  //       form then the entry should be restarted', () => {
  //     component.goingToWorkOnThis = false;
  //     component.entryToEdit = { ...entryToEdit, running: false };

  //     const checkIsEntryRunning: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#isEntryRunning');
  //     checkIsEntryRunning.click();
  //     fixture.detectChanges();

  //     expect(component.shouldRestartEntry).toBeTrue();
  //   });
});

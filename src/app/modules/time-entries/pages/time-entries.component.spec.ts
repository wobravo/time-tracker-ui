import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MonthPickerComponent,
  DetailsFieldsComponent,
  EmptyStateComponent,
  ModalComponent,
} from '../../shared/components';
import { GroupByDatePipe } from '../../shared/pipes';
import { TechnologyState } from '../../shared/store/technology.reducers';
import { allTechnologies } from '../../shared/store/technology.selectors';
import { TimeEntriesComponent } from './time-entries.component';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { allProjects } from '../../customer-management/components/projects/components/store/project.selectors';

describe('TimeEntriesComponent', () => {
  type Merged = TechnologyState & ProjectState;
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;

  const state = {
    projects: {
      projectList: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    activities: {
      data: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
      message: 'message',
    },
    technologies: {
      technologyList: { items: [{ name: 'test' }] },
      isLoading: false,
    },
  };

  const entry = {
    id: 'entry_1',
    project_id: 'Mido - 05 de Febrero',
    start_date: new Date('2020-02-05T15:36:15.887Z'),
    end_date: new Date('2020-02-05T18:36:15.887Z'),
    activity: 'development',
    technologies: ['Angular', 'TypeScript'],
    comments: 'No comments',
    uri: 'EY-25',
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
      providers: [provideMockStore({ initialState: state })],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(allProjects, state.projects);
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

  it('should get the entry List by Month', () => {
    const month = 3;
    component.getMonth(month);
    expect(component.dataByMonth.length).toEqual(1);
  });
});

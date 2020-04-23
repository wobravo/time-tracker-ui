import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CreateProjectTypeComponent } from './create-project-type.component';
import {
  ProjectTypeState,
  CreateProjectType,
  UpdateProjectType,
  projectTypeIdToEdit,
  allProjectTypes,
  ResetProjectTypeToEdit,
} from '../../store';
import { ProjectType } from '../../../../../shared/models/project-type.model';

describe('InputProjectTypeComponent', () => {
  let component: CreateProjectTypeComponent;
  let fixture: ComponentFixture<CreateProjectTypeComponent>;
  let store: MockStore<ProjectTypeState>;
  let projectTypeIdToEditMock;
  let allProjectTypesMock;
  let getProjectTypeByIdMock;

  const state = {
    data: [{ id: '', name: '', description: '' }],
    isLoading: false,
    message: '',
    projectTypeIdToEdit: '',
  };

  const projectType: ProjectType = {
    id: '1',
    name: 'Training',
    description: 'It is good for learning',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectTypeComponent],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form onSubmit and dispatch UpdateProjectType action', () => {
    const currentState = {
      data: [{ id: '1', name: 'xxx', description: 'xxxx' }],
      isLoading: false,
      message: '',
      projectTypeIdToEdit: '1',
    };

    projectTypeIdToEditMock = store.overrideSelector(projectTypeIdToEdit, currentState.projectTypeIdToEdit);
    allProjectTypesMock = store.overrideSelector(allProjectTypes, currentState.data);
    getProjectTypeByIdMock = store.overrideSelector(allProjectTypesMock, projectTypeIdToEditMock);

    component.projectTypeToEdit = getProjectTypeByIdMock;

    const projectTypeForm = {
      name: 'Develop',
      description: 'xxx',
    };

    const projectTypeUpdated = {
      id: component.projectTypeToEdit.id,
      name: 'Develop',
      description: 'xxx',
    };

    spyOn(component.projectTypeForm, 'reset');
    spyOn(store, 'dispatch');

    component.onSubmit(projectTypeForm);

    expect(component.projectTypeForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProjectType(projectTypeUpdated));
  });

  it('should reset form onSubmit and dispatch CreateProjectType action', () => {
    component.projectTypeToEdit = undefined;

    spyOn(component.projectTypeForm, 'reset');
    spyOn(store, 'dispatch');

    component.onSubmit(projectType);

    expect(component.projectTypeForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateProjectType(projectType));
  });

  it('should get name using projectTypeForm', () => {
    spyOn(component.projectTypeForm, 'get');
    // tslint:disable-next-line:no-unused-expression
    component.name;
    expect(component.projectTypeForm.get).toHaveBeenCalledWith('name');
  });

  it('should get description using projectTypeForm', () => {
    spyOn(component.projectTypeForm, 'get');

    // tslint:disable-next-line:no-unused-expression
    component.description;

    expect(component.projectTypeForm.get).toHaveBeenCalledWith('description');
  });

  it('should set data in projectTypeForm', () => {
    const projectTypeDataForm = {
      name: 'Training',
      description: 'It is good for learning',
    };

    spyOn(component.projectTypeForm, 'setValue');

    component.setDataToUpdate(projectType);
    expect(component.projectTypeForm.setValue).toHaveBeenCalledTimes(1);
    expect(component.projectTypeForm.setValue).toHaveBeenCalledWith(projectTypeDataForm);
  });

  it('should dispatch a ResetProjectTypeToEdit action', () => {
    spyOn(store, 'dispatch');

    component.cancelButton();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetProjectTypeToEdit());
  });
});
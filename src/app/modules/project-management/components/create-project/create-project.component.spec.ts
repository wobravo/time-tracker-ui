import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AppState } from '../../store/project.reducer';
import { CreateProjectComponent } from './create-project.component';
import * as actions from '../../store/project.actions';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let store: MockStore<AppState>;

  const state = {
    projectList: [{ id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit ngOnChange with projectToEdit', () => {
    const newData = {
      id: 'acf6a6c7-a24e-423c-8d1d-08505a82feae',
      name: 'Project Test 13',
      description: 'description',
    };

    component.projectToEdit = newData;
    component.ngOnChanges();
    expect(component.projectForm.value.name).toEqual(newData.name);
    expect(component.projectForm.value.description).toEqual(newData.description);
    expect(component.isEdit).toEqual(true);
  });

  it('should emit ngOnChange and reset ProjectForm', () => {
    component.projectToEdit = null;
    component.ngOnChanges();

    expect(component.projectForm.value.name).toEqual(null);
    expect(component.projectForm.value.description).toEqual(null);
    expect(component.isEdit).toEqual(false);
  });

  it('should dispatch PostProject action #onSubmit', () => {
    const project = {
      id: '1',
      name: 'app 4',
      description: 'It is a good app',
    };

    component.isEdit = false;
    spyOn(store, 'dispatch');
    component.onSubmit(project);
    expect(store.dispatch).toHaveBeenCalledWith(new actions.PostProject(project));
  });

  it('should dispatch PutProject action #onSubmit', () => {
    const project = {
      id: '1',
      name: 'app 4',
      description: 'It is a good app',
    };

    component.isEdit = true;
    spyOn(store, 'dispatch');
    component.onSubmit(project);
    expect(store.dispatch).toHaveBeenCalledWith(new actions.PutProject(project));
  });

  it('should clean the form and send a cancelForm event #reset', () => {
    const project = {
      name: 'app 4',
      description: 'It is a good app',
    };

    component.projectForm.setValue(project);
    spyOn(component.cancelForm, 'emit');
    component.reset();
    expect(component.projectForm.value.name).toEqual(null);
    expect(component.projectForm.value.description).toEqual(null);
    expect(component.cancelForm.emit).toHaveBeenCalled();
  });

  it('form invalid when empty', () => {
    expect(component.projectForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    const name = component.projectForm.controls.name;
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A');
    expect(name.hasError('required')).toBeFalsy();
  });

  it('description field validity', () => {
    const details = component.projectForm.controls.description;
    expect(details.valid).toBeFalsy();

    details.setValue('');
    expect(details.hasError('required')).toBeTruthy();

    details.setValue('A');
    expect(details.hasError('required')).toBeFalsy();
  });
});

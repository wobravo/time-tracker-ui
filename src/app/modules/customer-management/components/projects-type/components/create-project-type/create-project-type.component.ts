import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { ProjectType } from '../../../../../shared/models';
import { ProjectTypeState } from '../../store';
import { CreateProjectType, ResetProjectTypeToEdit, UpdateProjectType, getProjectTypeById } from '../../store';

@Component({
  selector: 'app-create-project-type',
  templateUrl: './create-project-type.component.html',
  styleUrls: ['./create-project-type.component.scss'],
})
export class CreateProjectTypeComponent implements OnInit {
  projectTypeForm: FormGroup;
  projectTypeToEdit: ProjectType;

  constructor(private formBuilder: FormBuilder, private store: Store<ProjectTypeState>) {
    this.projectTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const projectType$ = this.store.pipe(select(getProjectTypeById));
    projectType$.subscribe((projectType) => {
      this.projectTypeToEdit = projectType;
      this.setDataToUpdate(this.projectTypeToEdit);
    });
  }

  get name() {
    return this.projectTypeForm.get('name');
  }

  get description() {
    return this.projectTypeForm.get('description');
  }

  setDataToUpdate(projectTypeData: ProjectType) {
    if (projectTypeData) {
      this.projectTypeForm.setValue({
        name: projectTypeData.name,
        description: projectTypeData.description,
      });
    }
  }

  onSubmit(projectTypeData) {
    this.projectTypeForm.reset();

    if (this.projectTypeToEdit) {
      const projectType = {
        ...projectTypeData,
        id: this.projectTypeToEdit.id,
      };
      this.store.dispatch(new UpdateProjectType(projectType));
    } else {
      this.store.dispatch(new CreateProjectType(projectTypeData));
      this.projectTypeForm.get('description').setValue('');
    }
  }

  cancelButton() {
    this.store.dispatch(new ResetProjectTypeToEdit());
  }
}
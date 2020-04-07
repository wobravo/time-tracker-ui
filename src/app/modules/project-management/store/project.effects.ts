import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import * as actions from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private projectService: ProjectService, private store: Store<any>) {}

  @Effect()
  getProjects$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.GET_PROJECTS),
    mergeMap(() =>
      this.projectService.getProjects().pipe(
        map((project) => {
          return new actions.GetProjectsSuccess(project);
        }),
        catchError((error) => of(new actions.GetProjectsFail(error)))
      )
    )
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.CREATE_PROJECT),
    map((action: actions.CreateProject) => action.payload),
    mergeMap((project) =>
      this.projectService.createProject(project).pipe(
        map((projectData) => {
          return new actions.CreateProjectSuccess(projectData);
        }),
        catchError((error) => of(new actions.CreateProjectFail(error)))
      )
    )
  );

  @Effect()
  updateProject$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ProjectActionTypes.UPDATE_PROJECT),
    map((action: actions.UpdateProject) => action.payload),
    mergeMap((project) =>
      this.projectService.updateProject(project).pipe(
        map((projectData) => {
          return new actions.UpdateProjectSuccess(projectData);
        }),
        catchError((error) => of(new actions.UpdateProjectFail(error)))
      )
    )
  );
}

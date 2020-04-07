import { Action } from '@ngrx/store';
import { Project } from '../../shared/models';

export enum ProjectActionTypes {
  GET_PROJECTS = '[Projects] GET_PROJECTS',
  GET_PROJECTS_SUCCESS = '[Projects] GET_PROJECTS_SUCCESS',
  GET_PROJECTS_FAIL = '[Projects] GET_PROJECTS_FAIL',
  CREATE_PROJECT = '[Projects] CREATE_PROJECT',
  CREATE_PROJECT_SUCCESS = '[Projects] CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAIL = '[Projects] CREATE_PROJECT_FAIL',
  UPDATE_PROJECT = '[Projects] UPDATE_PROJECT',
  UPDATE_PROJECT_SUCCESS = '[Projects] UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAIL = '[Projects] UPDATE_PROJECT_FAIL',
}

export class GetProjectsLoad implements Action {
  public readonly type = ProjectActionTypes.GET_PROJECTS;
}

export class GetProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_SUCCESS;
  constructor(readonly payload: Project[]) {}
}

export class GetProjectsFail implements Action {
  public readonly type = ProjectActionTypes.GET_PROJECTS_FAIL;

  constructor(public error: string) {}
}

export class CreateProject implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT;

  constructor(public payload: Project) {}
}

export class CreateProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class CreateProjectFail implements Action {
  public readonly type = ProjectActionTypes.CREATE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export class UpdateProject implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT;

  constructor(public payload: Project) {}
}

export class UpdateProjectSuccess implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}

export class UpdateProjectFail implements Action {
  public readonly type = ProjectActionTypes.UPDATE_PROJECT_FAIL;

  constructor(public error: string) {}
}

export type ProjectActions =
  | GetProjectsLoad
  | GetProjectsSuccess
  | GetProjectsFail
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFail
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFail;

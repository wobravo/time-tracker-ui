import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { UserActionTypes } from './user.actions';
import { UserEffects } from './user.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let service: UsersService;
  let toastrService: ToastrService;
  const user = { id: 'id', name: 'name', email: 'email' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(UserEffects);
    service = TestBed.inject(UsersService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_USER_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(of(user));

    effects.loadUsers$.subscribe((action) => {
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_SUCCESS);
    });
  });

  it('action type is LOAD_USER_FAIL when service fail in execution', async () => {
    actions$ = of({ type: UserActionTypes.LOAD_USERS });
    const serviceSpy = spyOn(service, 'loadUsers');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadUsers$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.LOAD_USERS_FAIL);
    });
  });

  it('action type is GRANT_USER_ROLE_SUCCESS when service is executed sucessfully', async () => {
    const userId = 'userId';
    const roleId = 'roleId';
    actions$ = of({ type: UserActionTypes.GRANT_USER_ROLE, userId, roleId });
    const serviceSpy = spyOn(service, 'grantRole');
    spyOn(toastrService, 'success');
    serviceSpy.and.returnValue(of(user));

    effects.grantUserRole$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('Grant User Role Success');
      expect(action.type).toEqual(UserActionTypes.GRANT_USER_ROLE_SUCCESS);
    });
  });

  it('action type is GRANT_USER_ROLE_FAIL when service is executed and fail', async () => {
    const userId = 'userId';
    const roleId = 'roleId';
    actions$ = of({ type: UserActionTypes.GRANT_USER_ROLE, userId, roleId });
    spyOn(service, 'grantRole').and.returnValue(throwError({ error: { message: 'error' } }));
    spyOn(toastrService, 'error');

    effects.grantUserRole$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.GRANT_USER_ROLE_FAIL);
    });
  });

  it('action type is REVOKE_USER_ROLE_SUCCESS when service is executed sucessfully', async () => {
    const userId = 'userId';
    const roleId = 'roleId';
    actions$ = of({ type: UserActionTypes.REVOKE_USER_ROLE, userId, roleId });
    const serviceSpy = spyOn(service, 'revokeRole');
    spyOn(toastrService, 'success');
    serviceSpy.and.returnValue(of(user));

    effects.revokeUserRole$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith('Revoke User Role Success');
      expect(action.type).toEqual(UserActionTypes.REVOKE_USER_ROLE_SUCCESS);
    });
  });

  it('action type is REVOKE_USER_ROLE_FAIL when service is executed and fail', async () => {
    const userId = 'userId';
    const roleId = 'roleId';
    actions$ = of({ type: UserActionTypes.REVOKE_USER_ROLE, userId, roleId });
    spyOn(service, 'revokeRole').and.returnValue(throwError({ error: { message: 'error' } }));
    spyOn(toastrService, 'error');

    effects.revokeUserRole$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(UserActionTypes.REVOKE_USER_ROLE_FAIL);
    });
  });
});

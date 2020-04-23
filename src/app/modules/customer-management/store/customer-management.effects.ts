import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';
import * as actions from './customer-management.actions';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.LOAD_CUSTOMERS),
    mergeMap(() =>
      this.customerService.getCustomers().pipe(
        map((customers) => {
          return new actions.LoadCustomersSuccess(customers);
        }),
        catchError((error) => of(new actions.LoadCustomersFail(error)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.CREATE_CUSTOMER),
    map((action: actions.CreateCustomer) => action.payload),
    mergeMap((customer) =>
      this.customerService.createCustomer(customer).pipe(
        map((customerData) => {
          return new actions.CreateCustomerSuccess(customerData);
        }),
        catchError((error) => of(new actions.CreateCustomerFail(error)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.DELETE_CUSTOMER),
    map((action: actions.DeleteCustomer) => action.customerId),
    mergeMap((customerId) =>
      this.customerService.deleteCustomer(customerId).pipe(
        map(() => {
          return new actions.DeleteCustomerSuccesss(customerId);
        }),
        catchError((error) => of(new actions.DeleteCustomerFail(error)))
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.UPDATE_CUSTOMER),
    map((action: actions.UpdateCustomer) => action.payload),
    mergeMap((customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map((customerData) => {
          return new actions.UpdateCustomerSuccess(customerData);
        }),
        catchError((error) => of(new actions.UpdateCustomerFail(error)))
      )
    )
  );
}
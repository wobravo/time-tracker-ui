import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from 'src/app/modules/shared/models/customer.model';

import { CustomerState } from './customer-management.reducers';
export const getCustomerState = createFeatureSelector<CustomerState>('customers');

export const getStatusMessage = createSelector(getCustomerState, (messageState) => {
  if (messageState) {
    return messageState.message;
  }
});

export const allCustomers = createSelector(getCustomerState, (state: CustomerState) => {
  if (state) {
    return state.data;
  }
});

export const customerIdtoEdit = createSelector(getCustomerState, (state: CustomerState) => {
  if (state) {
    return state.customerIdToEdit;
  }
});

export const getCustomerById = createSelector(allCustomers, customerIdtoEdit, (customers, customerId) => {
  if (customers) {
    return customers.find((customer) => {
      return customer.id === customerId;
    });
  }
});

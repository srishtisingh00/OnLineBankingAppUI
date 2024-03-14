import { Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { LoginComponent } from './components/shared/login/login.component';
import { ListCustomersComponent } from './components/customers/list-customers/list-customers.component';
import { AddAccountComponent } from './components/customers/add-account/add-account.component';
import { AccountDetailsComponent } from './components/customers/account-details/account-details.component';
import { BeneficiariesComponent } from './components/customers/beneficiaries/beneficiaries.component';
import { AddBeneficiaryComponent } from './components/customers/add-beneficiary/add-beneficiary.component';
import { TransactionsDetailComponent } from './components/customers/transactions-detail/transactions-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'edit/:customerId', component: SignUpComponent },
  { path: 'Customers/:customerId', component: SignUpComponent }, // edit
  { path: 'Manager/CustomerStatusUpdate', component: ListCustomersComponent },
  { path: 'Manager/Customers', component: ListCustomersComponent },
  { path: 'addAccount/:customerId', component: AddAccountComponent },
  { path: 'AccountDetails', component: AccountDetailsComponent },
  { path: 'BeneficiariesDetails', component: BeneficiariesComponent },
  { path: 'AddBeneficiaries', component: AddBeneficiaryComponent },
  { path: 'TransactionsDetails', component: TransactionsDetailComponent },
];

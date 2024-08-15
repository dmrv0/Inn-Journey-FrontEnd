import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ChangePassComponent } from './chance-pass/chance-pass.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MyCommentsComponent } from './my-comments/my-comments.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'changeInformation', component: ChangePassComponent },
  { path: 'myPayments', component: MyPaymentsComponent},
  { path: 'myComments', component: MyCommentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

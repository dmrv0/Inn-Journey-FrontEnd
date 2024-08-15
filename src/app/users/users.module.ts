import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './chance-pass/chance-pass.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { MyCommentsComponent } from './my-comments/my-comments.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    UsersComponent,
    MyReservationsComponent,
    SidebarComponent,
    ChangePassComponent,
    MyPaymentsComponent,
    MyCommentsComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    SharedModule,
    ConfirmDialogModule,
      ButtonModule,
      ToastModule,
      TabMenuModule,
      PaginatorModule

    
  ],
  exports:[
  
  ]
})
export class UsersModule { }

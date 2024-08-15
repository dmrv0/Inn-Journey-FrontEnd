import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { GetReservationsComponent } from './reservation/get-reservations/get-reservations.component';
import { MyHotelsComponent } from './hotels/my-hotels/my-hotels.component';
import {MatTableModule} from '@angular/material/table';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AddHotelComponent } from './hotels/add-hotel/add-hotel.component';
import { GetRoomComponent } from './room/get-room/get-room.component';
import { DeleteRoomComponent } from './room/delete-room/delete-room.component';
import { UpdateRoomComponent } from './room/update-room/update-room.component';
import { GetReviewComponent } from './get-review/get-review.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './getPayments/payment.component';
import { ExtensionsRoomComponent } from './room/extensions-room/extensions-room.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ExtensionsComponent } from './hotels/extensions/extensions.component';
import { PaginatorModule } from 'primeng/paginator';
import { CustomersComponent } from './customers/customers.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';




@NgModule({
  declarations: [
    AdminComponent,
    AddRoomComponent,
    GetReservationsComponent,
    MyHotelsComponent,
    EditHotelComponent,
    AddHotelComponent,
    GetRoomComponent,
    DeleteRoomComponent,
    UpdateRoomComponent,
    GetReviewComponent,
    PaymentComponent,
    ExtensionsRoomComponent,
    ExtensionsComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatOption,
    MatSelectModule,
    MatSnackBarModule,
    SharedModule,
    DragDropModule,
    PaginatorModule,
    ConfirmDialogModule,
    
   
  ],
  providers: [ConfirmationService],
})
export class AdminModule { }

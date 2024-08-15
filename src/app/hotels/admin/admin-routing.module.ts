import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MyHotelsComponent } from './hotels/my-hotels/my-hotels.component';
import { GetReservationsComponent } from './reservation/get-reservations/get-reservations.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { AddHotelComponent } from './hotels/add-hotel/add-hotel.component';
import { GetRoomComponent } from './room/get-room/get-room.component';
import { UpdateRoomComponent } from './room/update-room/update-room.component';
import { DeleteRoomComponent } from './room/delete-room/delete-room.component';
import { GetReviewComponent } from './get-review/get-review.component';
import { PaymentComponent } from './getPayments/payment.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:'myHotels', component:MyHotelsComponent},
  {path:'addHotel', component:AddHotelComponent},
  {path:'myHotels/Rezervations/:id', component:GetReservationsComponent },
  {path:'addRoom', component:AddRoomComponent},
  {path:'getRoom', component:GetRoomComponent},
  {path:'getPayments', component:PaymentComponent},
  {path:'getReview', component:GetReviewComponent},
  {path:'deleteRoom/:id', component:DeleteRoomComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

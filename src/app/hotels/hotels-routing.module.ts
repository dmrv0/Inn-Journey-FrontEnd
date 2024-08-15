import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { PaymentComponent } from './hotel/reservation/payment/payment.component';
import { ReservationComponent } from './hotel/reservation/reservation.component';

const routes: Routes = [
  { path: "", component: HotelsComponent },
  { path: ":hotelName/details/:id", component: HotelComponent },
  { path: "page/:pageNo", component: HotelsComponent, },
  { path: "addReservation", component: ReservationComponent },
  { path: "payment/:id", component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class HotelsRoutingModule { }

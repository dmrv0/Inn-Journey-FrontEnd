import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { HotelComponent } from './hotel/hotel.component';
import { ReservationComponent } from './hotel/reservation/reservation.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/interceptor/auth-interceptor';
import { ReviewComponent } from './hotel/review/review.component';
import { PaymentComponent } from './hotel/reservation/payment/payment.component';
import { RoomComponent } from './hotel/room/room.component';
import { SharedModule } from '../shared/shared.module';
import { ExtensionsComponent } from './hotel/extensions/extensions.component';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    HotelsComponent,
    HotelComponent,
    ReservationComponent,
    ReviewComponent,
    PaymentComponent,
    RoomComponent,
    ExtensionsComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule, //ngmodel için
    CalendarModule,
    SharedModule,
    ProgressSpinnerModule,
    
  ],
  providers:[
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},

  ]
})
export class HotelsModule { }

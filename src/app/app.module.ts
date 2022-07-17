import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TheaterBookingMemorizationService } from './theater-booking-memorization.service';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { GetShowIdComponent } from './get-show-id/get-show-id.component';
import { GetBookerNameComponent } from './get-booker-name/get-booker-name.component';
import { DisplayShowBookingsComponent } from './display-show-bookings/display-show-bookings.component'
import { AdminAccessComponent } from './admin-area/admin-access/admin-access.component'
import { NewShowComponent } from './admin-area/new-show/new-show.component'
import { NewShowIdComponent } from './admin-area/new-show-id/new-show-id.component'
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, CommonModule ],
  providers:    [ TheaterBookingMemorizationService ],
  declarations: [ AppComponent, HelloComponent, UserAreaComponent,      AdminAreaComponent, GetShowIdComponent, GetBookerNameComponent, DisplayShowBookingsComponent, AdminAccessComponent, NewShowComponent, NewShowIdComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

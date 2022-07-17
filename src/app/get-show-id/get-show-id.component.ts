import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TheaterBookingMemorizationService } from '../theater-booking-memorization.service';
import { ShowBookings } from '../show-bookings';
import { TheaterDimensions } from '../theater-dimensions';

@Component({
  selector: 'app-get-show-id',
  templateUrl: './get-show-id.component.html',
  styleUrls: ['./get-show-id.component.css']
})
export class GetShowIdComponent implements OnInit {

  @Output() newShow = new EventEmitter<ShowBookings>();
  @Output() newShowId = new EventEmitter<string>();

  /**************************** ARGUMENTS ****************************/
  private selected_show_id : string = undefined;
  private show_bookings : ShowBookings = undefined;

  /*************************** CONSTRUCTOR ***************************/
  constructor(private theater_booking_memorization_service: TheaterBookingMemorizationService){
    this.show_bookings = new ShowBookings("show");
  }

  ngOnInit() {
  }

  /***************************** GETTERS *****************************/
  public getSelectedShowId() : string{
    return this.selected_show_id;
  }

  /***************************** SETTERS *****************************/
  public setSelectedShowId(show_id : string){
    if(show_id != undefined){
    this.theater_booking_memorization_service
      .getDataFromDatabase(show_id)
      .then((result: string) => {
        if (result != undefined) {
          let aux_bookings : ShowBookings = new ShowBookings("show");
          Object.assign(aux_bookings, JSON.parse(result));
          this.show_bookings = aux_bookings;
          this.selected_show_id = show_id;
          this.newShow.emit(this.show_bookings);
          this.newShowId.emit(this.selected_show_id);
        } else {
          console.log('Void database');
          this.show_bookings = undefined;
          this.selected_show_id = undefined;
        }
      })
      .catch((error: string) => {
        console.error('Database error ' + error);
        this.show_bookings = undefined;
        this.selected_show_id = undefined;
      });
    }
  } 
  
  public resetShowId(){
    this.show_bookings = undefined;
    this.selected_show_id = undefined;
    this.newShow.emit(this.show_bookings);
    this.newShowId.emit(this.selected_show_id);
  }
}
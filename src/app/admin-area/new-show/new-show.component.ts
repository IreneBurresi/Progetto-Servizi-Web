import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowBookings } from '../../show-bookings';
import { TheaterBookingMemorizationService } from '../../theater-booking-memorization.service';
import { TheaterDimensions } from '../../theater-dimensions';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css']
})
export class NewShowComponent implements OnInit {

  @Input() show_id : string;
  @Output() newDimensions = new EventEmitter<boolean>();

  /*************************** CONSTRUCTOR ***************************/
  constructor(private theater_booking_memorization_service: TheaterBookingMemorizationService){}

  ngOnInit() {
  }

  /********************* DATABASE COMMUNICATION *********************/
  private resetShowBookingsIntoDatabase(show_id : string, show_bookings : ShowBookings){
    return this.theater_booking_memorization_service
      .sendDataToDatabase(show_id, JSON.stringify(show_bookings));
  }

  public resetShow(parterre_rows_n : number, parterre_seats_n : number, box_rows_n : number, box_seats_n : number){
    try{
      let aux_theter_dimensions = new TheaterDimensions(parterre_rows_n, parterre_seats_n, box_rows_n, box_seats_n);
      let aux_show_bookings = new ShowBookings("Show", aux_theter_dimensions);
      this.resetShowBookingsIntoDatabase(this.show_id, aux_show_bookings)
        .then((result: string) => {
          console.log('Sended: ' + result);
          this.newDimensions.emit(true);
        });
    }
    catch (error){
      console.error(error);
    }
  }

}
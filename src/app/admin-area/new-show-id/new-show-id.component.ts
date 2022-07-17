import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowBookings } from '../../show-bookings';
import { TheaterBookingMemorizationService } from '../../theater-booking-memorization.service';

@Component({
  selector: 'app-new-show-id',
  templateUrl: './new-show-id.component.html',
  styleUrls: ['./new-show-id.component.css'],
})
export class NewShowIdComponent implements OnInit {
  @Output() newShowId = new EventEmitter<string>();

  /**************************** ARGUMENT ****************************/
  private show_id: string = undefined;

  /*************************** CONSTRUCTOR ***************************/
  constructor(
    private theater_booking_memorization_service: TheaterBookingMemorizationService
  ) {}

  ngOnInit() {}

  /***************************** GETTERS *****************************/
  public getShowId(): string {
    return this.show_id;
  }

  /***************************** SETTERS *****************************/
  public setShowId(show_id: string) {
    this.show_id = show_id;
    console.log(this.show_id);
    this.newShowId.emit(this.show_id);
  }

  /********************* DATABASE COMMUNICATION *********************/
  public getNewKeyFromDatabase() {
    this.theater_booking_memorization_service
      .newKeyFromDatabase()
      .then((result: string) => {
        if (result != undefined) {
          this.show_id = this.show_id;
          this.resetShowWithStandardDimensions();
          this.setShowId(result);
        } else {
          console.log('Error');
        }
      })
      .catch((error: string) => {
        console.log('Invalid show code');
      });
  }

  private resetShowBookingsIntoDatabase(
    show_id: string,
    show_bookings: ShowBookings
  ) {
    return this.theater_booking_memorization_service.sendDataToDatabase(
      show_id,
      JSON.stringify(show_bookings)
    );
  }

  public resetShowWithStandardDimensions() {
    try {
      let aux_show_bookings = new ShowBookings('Show');
      this.resetShowBookingsIntoDatabase(this.show_id, aux_show_bookings).then(
        (result: string) => {
          console.log('Sended' + result);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

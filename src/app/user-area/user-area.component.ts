import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TheaterBookingMemorizationService } from '../theater-booking-memorization.service';
import { ShowBookings } from '../show-bookings';
import { TheaterDimensions } from '../theater-dimensions';
import { DisplayShowBookingsComponent } from '../display-show-bookings/display-show-bookings.component';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css'],
})
export class UserAreaComponent implements OnInit {
  @Output() userAccessed = new EventEmitter<boolean>();

  /**************************** ARGUMENTS ****************************/
  private show_id: string = undefined;
  private booker_name: string = undefined;
  private selected_seat: { row_n: number; seat_n: number; seat_type: string } =
    undefined;
  private show_bookings: ShowBookings = undefined;

  /*************************** CONSTRUCTOR ***************************/
  constructor(
    private theater_booking_memorization_service: TheaterBookingMemorizationService
  ) {}

  ngOnInit() {}

  /***************************** GETTERS *****************************/
  public getShowId(): string {
    return this.show_id;
  }
  public getShowBookings(): ShowBookings {
    return this.show_bookings;
  }
  public getBookerName(): string {
    return this.booker_name;
  }

  public getSelectedSeat() {
    return this.selected_seat;
  }

  /***************************** SETTERS *****************************/
  public setShowId(show_id: string) {
    this.userAccessed.emit(true);
    this.show_id = show_id;
  }

  public setShow(show: ShowBookings) {
    this.show_bookings = show;
    console.log(this.show_bookings);
  }
  public setBookerName(booker_name: string) {
    this.booker_name = booker_name;
  }

  public setSelectedSeat(selected_seat) {
    this.selected_seat = selected_seat;
    console.log(this.selected_seat.row_n.toString());
  }

  public selectSeat(row_n: number, seat_n: number, seat_type: string) {
    this.selected_seat = { row_n, seat_n, seat_type };
  }

  /**************************** UTILITIES ****************************/

  public printSelectedSeat(): string {
    return DisplayShowBookingsComponent.getSeatNumber(
      this.selected_seat.row_n,
      this.selected_seat.seat_n
    );
  }

  public bookSeat() {
    if (this.booker_name == undefined) {
      return;
    }
    this.updateShowBokingsToDatabase();
  }

  /********************* DATABASE COMMUNICATION *********************/
  private getShowBookingsFromDatabase() {
    this.theater_booking_memorization_service
      .getDataFromDatabase(this.show_id)
      .then((result: string) => {
        if (result != undefined) {
          Object.assign(this.show_bookings, JSON.parse(result));
        } else {
          console.log('Void database');
          this.show_bookings = undefined;
          this.show_id = undefined;
        }
      })
      .catch((error: string) => {
        console.log('Error in database communication: ' + error);
        this.show_bookings = undefined;
        this.show_id = undefined;
      });
  }


  private updateShowBokingsToDatabase(){
    this.theater_booking_memorization_service
      .getDataFromDatabase(this.show_id)
      .then((result: string) => {
        if (result != undefined) {
          Object.assign(this.show_bookings, JSON.parse(result));
          let invalid : boolean = false;
          if (this.selected_seat.seat_type == 'parterre') {
            if(this.show_bookings.getParterreBookings()[this.selected_seat.row_n][this.selected_seat.seat_n] == "x"){
              this.show_bookings.setParterreBookings(
                this.selected_seat.row_n,
                this.selected_seat.seat_n,
                this.booker_name
              );
            }
            else{
              invalid = true;
            }
          } 
          if (this.selected_seat.seat_type == 'boxes') {
            if(this.show_bookings.getBoxesBookings()[this.selected_seat.row_n][this.selected_seat.seat_n] == "x"){
              this.show_bookings.setBoxesBookings(
                this.selected_seat.row_n,
                this.selected_seat.seat_n,
                this.booker_name
              );
            } 
            else{
              invalid = true;
            }
          }
          if(!invalid){

            this.theater_booking_memorization_service.sendDataToDatabase(
              this.show_id,
              JSON.stringify(this.show_bookings)
            )
            .then((result: string) => {
              console.log('Sended' + result);
              this.booker_name = undefined;
              this.getShowBookingsFromDatabase();
            });
            document.getElementById('output').innerHTML =
              'Posto ' +
              this.printSelectedSeat() +
              ' prenotato a nome ' +
              this.booker_name;
          }
          else{
            document.getElementById('output').innerHTML = "Qualcuno ha già prentato questo posto";
          }
        } else {
          console.error('Void database');
          this.show_bookings = undefined;
          this.show_id = undefined;
        }
      })
      .catch((error: string) => {
        console.error('Error in database communication' + error);
        this.show_bookings = undefined;
        this.show_id = undefined;
      });
  }
}

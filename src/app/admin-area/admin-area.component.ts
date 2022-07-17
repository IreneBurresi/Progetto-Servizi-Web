import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowBookings } from '../show-bookings';
import { TheaterBookingMemorizationService } from '../theater-booking-memorization.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css'],
})
export class AdminAreaComponent implements OnInit {
  @Output() adminAccessed = new EventEmitter<boolean>();

  /**************************** ARGUMENTS ****************************/
  private admin_accessed: boolean = false;
  private show_id: string = undefined;
  private show_bookings: ShowBookings = undefined;
  private booker_name: string = undefined;

  private selected_seat: { row_n: number; seat_n: number; seat_type: string } =
    undefined;

  /*************************** CONSTRUCTOR ***************************/
  constructor(
    private theater_booking_memorization_service: TheaterBookingMemorizationService
  ) {}

  ngOnInit() {}

  /***************************** GETTERS *****************************/

  public getAdminAccessed(): boolean {
    return this.admin_accessed;
  }

  public getSeatNumber(row_n: number, seat_n: number) {
    let seat_number: string =
      String.fromCharCode(64 + row_n + 1) + (seat_n + 1).toString();
    return seat_number;
  }

  public getSelectedSeat() {
    return this.selected_seat;
  }

  public getShowId(): string {
    return this.show_id;
  }
  public getShowBookings(): ShowBookings {
    return this.show_bookings;
  }

  public getBookerName(): string {
    return this.booker_name;
  }

  /***************************** SETTERS *****************************/
  public setShowId(show_id: string) {
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
    this.bookSeat();
  }

  public resetShowId() {
    this.show_id = undefined;
  }

  public selectSeat(row_n: number, seat_n: number, seat_type: string) {
    this.selected_seat = { row_n, seat_n, seat_type };
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
        console.log('Invalid show code');
        this.show_bookings = undefined;
        this.show_id = undefined;
      });
  }

  private sendShowBookingsToDatabase() {
    return this.theater_booking_memorization_service.sendDataToDatabase(
      this.show_id,
      JSON.stringify(this.show_bookings)
    );
  }

  public newDimensions(bool: boolean) {
    this.getShowBookingsFromDatabase();
    this.selected_seat = undefined;
    this.booker_name = undefined;
  }

  /**************************** UTILITIES ****************************/
  public correctlyAccessed(has_accessed: boolean) {
    if (has_accessed == true) {
      this.admin_accessed = true;
      this.adminAccessed.emit(true);
    }
  }

  public bookSeat() {
    if (this.booker_name == undefined) {
      return;
    }
    this.updateShowBokingsToDatabase();
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
              this.getShowBookingsFromDatabase();
            });
            document.getElementById('output').innerHTML =
              "Fatto";
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

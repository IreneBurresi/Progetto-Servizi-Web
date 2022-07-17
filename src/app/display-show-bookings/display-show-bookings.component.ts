import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ShowBookings } from '../show-bookings';
import { TheaterBookingMemorizationService } from '../theater-booking-memorization.service';
import { TheaterDimensions } from '../theater-dimensions';

@Component({
  selector: 'app-display-show-bookings',
  templateUrl: './display-show-bookings.component.html',
  styleUrls: ['./display-show-bookings.component.css'],
})
export class DisplayShowBookingsComponent implements OnInit {
  @Input() show_bookings: ShowBookings;
  @Output() newSelectedSeat = new EventEmitter<any>();

  /**************************** ARGUMENT ****************************/
  private selected_seat: { row_n: number; seat_n: number; seat_type: string } =
    undefined;

  /*************************** CONSTRUCTOR ***************************/
  constructor(private tbm: TheaterBookingMemorizationService) {}
  ngOnInit() {}

  /***************************** GETTERS *****************************/
  public getShowBookings(): ShowBookings {
    return this.show_bookings;
  }

  public static getSeatNumber(row_n: number, seat_n: number): string {
    let seat_number: string =
      String.fromCharCode(64 + row_n + 1) + (seat_n + 1).toString();
    return seat_number;
  }

  public getSelectedSeat() {
    return this.selected_seat;
  }

  /**************************** UTILITIES ****************************/
  public printSeatNumber(row_n: number, seat_n: number): string {
    return DisplayShowBookingsComponent.getSeatNumber(row_n, seat_n);
  }

  public printSelectedSeat(): string {
    return DisplayShowBookingsComponent.getSeatNumber(
      this.selected_seat.row_n,
      this.selected_seat.seat_n
    );
  }

  public selectSeat(row_n: number, seat_n: number, seat_type: string) {
    this.selected_seat = { row_n, seat_n, seat_type };
    this.newSelectedSeat.emit(this.selected_seat);
  }
}

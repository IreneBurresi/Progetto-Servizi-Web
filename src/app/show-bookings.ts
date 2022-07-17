import { TheaterDimensions } from "./theater-dimensions";

export class ShowBookings {

  /**************************** ARGUMENTS ****************************/
  private show_id : string = undefined;
  private theather_dimensions : TheaterDimensions;
  private parterre_bookings : Array<Array<string>>;
  private box_bookings : Array<Array<string>>;

  /*************************** CONSTRUCTOR ***************************/
  constructor(show_id : string, theater_dimensions? : TheaterDimensions){
    console.log('Constructing Theater');
    this.show_id = show_id;
    if(theater_dimensions !== undefined){
      this.theather_dimensions = theater_dimensions;
    }
    else {
      //Assegno le dimensioni standard
      this.theather_dimensions = new TheaterDimensions();
    }
    //Riempo   
    this.parterre_bookings = new Array(this.theather_dimensions.getNumberOfParterreRows()).fill("").map((elem) =>{
      return new Array(this.theather_dimensions.getNumberOfSeatsPerParterreRow()).fill("x");
    });

    this.box_bookings = new Array(this.theather_dimensions.getNumberOfBoxesRows()).fill("").map((elem) => {
      return new Array(this.theather_dimensions.getNumberOfSeatsPerBox()).fill("x");
    });
  }

  /***************************** GETTERS *****************************/
  public getShowId() : string{
    return this.show_id;
  }
  public getTheaterDimensions() : TheaterDimensions{
    return this.theather_dimensions;
  }  

  public getParterreBookings() : Array<Array<string>>{
    return this.parterre_bookings;
  }

  public getBoxesBookings() : Array<Array<string>>{
    return this.box_bookings;
  }
  
  /***************************** SETTERS *****************************/
  public setParterreBookings(row_n : number, seat_n : number, value : string){
    this.parterre_bookings[row_n][seat_n] = value;
  }

  public setBoxesBookings(row_n : number, seat_n : number, value : string){
    this.box_bookings[row_n][seat_n] = value;
  }
}
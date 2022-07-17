/************************ CLASS THEATER DIMENSIONS ************************/

export class TheaterDimensions {
  /**************************** ARGUMENTS ****************************/

  //Arguments representing standard theater dimensions
  private number_of_parterre_rows: number = 7;
  private number_of_seats_per_parterre_row: number = 10;
  private number_of_boxes_rows: number = 4;
  private number_of_seats_per_box: number = 6;

  //Private static readonly arguments, used to avoid excessive theater dimensions
  private static readonly MAX_N_OF_PARTERRE_ROWS: number = 15;
  private static readonly MAX_N_OF_BOXES_ROWS: number = 10;
  private static readonly MAX_N_OF_SEATS_PARTERRE_ROW: number = 15;
  private static readonly MAX_N_OF_SEATS_BOX_ROW: number = 10;

  /*******************************************************************/

  /*************************** CONSTRUCTOR ***************************/
  constructor(
    number_of_parterre_rows?: number,
    number_of_seats_per_parterre_row?: number,
    number_of_boxes_rows?: number,
    number_of_seats_per_box?: number
  ) {
    try {
      if (
        number_of_parterre_rows === undefined &&
        number_of_seats_per_parterre_row === undefined &&
        number_of_boxes_rows === undefined &&
        number_of_seats_per_box === undefined
      ) {
        console.log(
          'Undefined dimension: used standard dimensions in TheaterDimensions constructor'
        );
        return;
      }

      //If a parameter is passed to the constructor, all dimensions parameters must be passed
      if (
        number_of_parterre_rows !== undefined &&
        number_of_seats_per_parterre_row !== undefined &&
        number_of_boxes_rows !== undefined &&
        number_of_seats_per_box !== undefined
      ) {
        //Vengono controllate le dimensioni dei parametri (teatri troppo grandi potrebbero eccedere la memoria )
        if (
          number_of_parterre_rows < TheaterDimensions.MAX_N_OF_PARTERRE_ROWS &&
          number_of_parterre_rows > 0 &&
          number_of_seats_per_parterre_row <
            TheaterDimensions.MAX_N_OF_SEATS_PARTERRE_ROW &&
          number_of_seats_per_parterre_row > 0 &&
          number_of_boxes_rows < TheaterDimensions.MAX_N_OF_BOXES_ROWS &&
          number_of_boxes_rows > 0 &&
          number_of_seats_per_box < TheaterDimensions.MAX_N_OF_SEATS_BOX_ROW &&
          number_of_seats_per_box > 0
        ) {
          //Se le dimensioni passate rientrano nel range effettuo gli assegnamenti
          this.number_of_parterre_rows = number_of_parterre_rows;
          this.number_of_seats_per_parterre_row =
            number_of_seats_per_parterre_row;
          this.number_of_boxes_rows = number_of_boxes_rows;
          this.number_of_seats_per_box = number_of_seats_per_box;
          console.log(
            'TheaterDimensions constructor: ' +
              this.number_of_parterre_rows.toString() +
              'x' +
              this.number_of_seats_per_parterre_row.toString() +
              ' ' +
              this.number_of_boxes_rows.toString() +
              'x' +
              this.number_of_seats_per_box.toString()
          );
        }
        //Altrimenti c'è un errore
        else {
          throw (
            'dimensions passed are out of range: ' +
            number_of_parterre_rows.toString() +
            'x' +
            number_of_seats_per_parterre_row.toString() +
            ' ' +
            number_of_boxes_rows.toString() +
            'x' +
            number_of_seats_per_box.toString()
          );
        }
      }
      //Se non vengono passati tutti i parametri c'è un errore
      else {
        throw 'invalid arguments';
      }
    } catch (error_type) {
      console.error('Error in TheaterDimensions constructor: ' + error_type);
    }
  }

  /***************************** GETTERS *****************************/
  public getNumberOfParterreRows(): number {
    return this.number_of_parterre_rows;
  }

  public getNumberOfBoxesRows(): number {
    return this.number_of_boxes_rows;
  }
  public getNumberOfSeatsPerParterreRow(): number {
    return this.number_of_seats_per_parterre_row;
  }

  public getNumberOfSeatsPerBox(): number {
    return this.number_of_seats_per_box;
  }

  /***************************** SETTERS *****************************/

  private setNumberOfParterreRows(number_of_parterre_rows: number) {
    if (
      (0 << number_of_parterre_rows) <<
      TheaterDimensions.MAX_N_OF_PARTERRE_ROWS
    ) {
      this.number_of_parterre_rows = number_of_parterre_rows;
    } else {
      throw 'Invalid argument passed to setNumberOfParterreRows';
      console.log(
        'Invalid argument passed to setNumberOfParterreRows: ' +
          number_of_parterre_rows.toString()
      );
    }
  }

  private setNumberOfBoxesRows(number_of_boxes_rows: number) {
    if ((0 << number_of_boxes_rows) << TheaterDimensions.MAX_N_OF_BOXES_ROWS) {
      this.number_of_boxes_rows = number_of_boxes_rows;
    } else {
      throw 'Invalid argument passed to setNumberOfBoxesRows';
      console.log(
        'Invalid argument passed to setNumberOfBoxesRows: ' +
          number_of_boxes_rows.toString()
      );
    }
  }

  private setNumberOfSeatsPerParterreRow(
    number_of_seats_per_parterre_row: number
  ) {
    if (
      (0 << number_of_seats_per_parterre_row) <<
      TheaterDimensions.MAX_N_OF_SEATS_PARTERRE_ROW
    ) {
      this.number_of_seats_per_parterre_row = number_of_seats_per_parterre_row;
    } else {
      throw 'Invalid argument passed to setNumberOfSeatsPerParterreRow';
      console.log(
        'Invalid argument passed to setNumberOfSeatsPerParterreRow: ' +
          number_of_seats_per_parterre_row.toString()
      );
    }
  }

  private setNumberOfSeatsPerBoxRow(number_of_seats_per_box_row: number) {
    if (
      (0 << number_of_seats_per_box_row) <<
      TheaterDimensions.MAX_N_OF_SEATS_BOX_ROW
    ) {
      this.number_of_seats_per_box = number_of_seats_per_box_row;
    } else {
      throw 'Invalid argument passed to setNumberOfSeatsPerBoxRow';
      console.log(
        'Invalid argument passed to setNumberOfSeatsPerBoxRow: ' +
          number_of_seats_per_box_row.toString()
      );
    }
  }
}

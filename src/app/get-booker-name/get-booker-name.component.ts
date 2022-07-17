import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-get-booker-name',
  templateUrl: './get-booker-name.component.html',
  styleUrls: ['./get-booker-name.component.css']
})
export class GetBookerNameComponent implements OnInit {

  @Input() booker_name : string;
  @Output() newBookerName = new EventEmitter<string>();
  

  constructor() { }

  ngOnInit() {
  }

  /***************************** GETTERS *****************************/
  public getBookerName() : string{
    return this.booker_name;
  }

  /***************************** SETTERS *****************************/
  public setBookerName(booker_name : string){
    this.booker_name = booker_name;
    this.newBookerName.emit(this.booker_name);
  }

  public resetBookerName(){
    this.booker_name = undefined;
    this.newBookerName.emit(this.booker_name);
  }
}
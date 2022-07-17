import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})
export class AdminAccessComponent implements OnInit {

  @Output() correctAccess = new EventEmitter<boolean>();
  /**************************** ARGUMENTS ****************************/
  private admin_accessed : boolean = false;

  
  constructor() { }

  ngOnInit() {
  }


  /***************************** SETTERS *****************************/
  public setPassword(password : string){
    if(password == "admin"){
      this.admin_accessed = true;
      this.correctAccess.emit(this.admin_accessed);
    }
  }


}
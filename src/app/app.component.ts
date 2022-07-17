import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  private has_admin_accessed: boolean = false;
  private has_user_accessed: boolean = false;

  /***************************** GETTERS *****************************/
  public getAdmin(): boolean {
    return this.has_admin_accessed;
  }

  public getUser(): boolean {
    return this.has_user_accessed;
  }

  /***************************** SETTERS *****************************/
  public setAdminAccessed() {
    this.has_admin_accessed = true;
  }

  public setUserAccessed(bool: boolean) {
    this.has_user_accessed = bool;
  }
}

import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []
  userJoin = {user: "", event: ""};
  userQuit = {user: "", event: ""};
  user = "ZC";
  constructor(private _eventService: EventService,
  private _authService: AuthService,
  private _router: Router) {
  }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData(): void {
    this._eventService.getEvents()
      .subscribe(
        res => {this.events = res;
        this.subscribeToData();})
    }

  private subscribeToData(): void {
    timer(5000).subscribe(() => this.refreshData());
  }

  join(event) {
    if(this._authService.loggedIn()){
      this.userJoin.event = event;
      this.userJoin.user = "ZC";
      this._eventService.join(this.userJoin).subscribe(
        res => this.userJoin = res
      )
      console.log("joined")
    } else {
      this._router.navigate(['./login'])
    }
  }
  quit(event){
    this.userQuit.event = event;
    this.userQuit.user = "ZC";
    this._eventService.quit(this.userQuit).subscribe(
      res => this.userQuit = res
    )
    console.log("quit")
  }
}

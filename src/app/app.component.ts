import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ListenerService } from './services/listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  displayNavbar;
  constructor(private authService:AuthService,private listener:ListenerService){}
  ngOnInit(): void {
    this.listener.connected.subscribe(()=>{
      this.ngOnInit();
    })
    this.displayNavbar=this.authService.loggedIn();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListenerService } from 'src/app/services/listener.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  constructor(private authService:AuthService,private router:Router, private listener:ListenerService) { }

  ngOnInit(): void {
    this.user = this.authService.getConnectedUser();
  }


  logout(){
    this.authService.logout();
    this.listener.connected.next();
    this.router.navigate(['/login']);

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronCircleLeft, faPowerOff, faReply } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ListenerService } from 'src/app/services/listener.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user;
  faChevronCircleLeft=faReply;
  faPowerOff=faPowerOff;
  constructor(private authService:AuthService,private router:Router, private listener:ListenerService) { }

  ngOnInit(): void {
    this.user = this.authService.getConnectedUser();
  }


  logout(){
    this.authService.logout();
    this.listener.connected.next();
    this.router.navigate(['/login']);

  }

  navigateBack(){
    let navigation = JSON.parse(localStorage.getItem("navigation"));
    if (navigation != null && navigation != undefined && navigation.length!=0){
      let destination = navigation[navigation.length-1];
      navigation.pop();
      localStorage.setItem("navigation",JSON.stringify(navigation));
      this.router.navigate([destination]);
    }
  }

  navigate(destination){
    let navigation = JSON.parse(localStorage.getItem("navigation"));
    if (navigation != null && navigation != undefined ) {
      navigation.push(this.router.url.toString());
    }else{
      navigation = [this.router.url.toString()]
    }
    localStorage.setItem("navigation",JSON.stringify(navigation));
    this.router.navigate(['/'+destination]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListenerService } from 'src/app/services/listener.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: String;
  login: String;

  submitted;
  incorrect;

  constructor(private auth: AuthService, private router: Router, private listener: ListenerService) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.submitted=true;
    const cordonnes = {
      login: this.login,
      password: this.password
    };
    this.auth.login(cordonnes).subscribe(data => {
      if (data.success) {
        this.auth.enregistrerToken(data.token, data.user);
        this.listener.connected.next();
        this.router.navigate(['/home']);
      } else {
        this.incorrect=true;
        console.log(data);// creer un message d'erreur 'mot de passe incorrect'
      }
    });
  
  }
}

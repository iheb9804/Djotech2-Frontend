import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListenerService } from 'src/app/services/listener.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: String;
  login: String;

  submitted;
  incorrect;
  errorMessage;

  constructor(private auth: AuthService, private router: Router, private listener: ListenerService) { }

  ngOnInit(): void {
    this.login = "";
    this.password = "";
    this.incorrect = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.login)
    if (this.login != "" && this.password != "") {
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
          this.incorrect = true;
          this.errorMessage = data.error;
          console.log(data);// creer un message d'erreur 'mot de passe incorrect'
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {

  name;
  phone;
  email;
  description;
  credit;

  constructor(private providerService:ProviderService,private router:Router) { }

  ngOnInit(): void {
  }
  navigate(destination) {
    let navigation = JSON.parse(localStorage.getItem("navigation"));
    if (navigation != null && navigation != undefined) {
      navigation.push(this.router.url.toString());
    } else {
      navigation = [this.router.url.toString()]
    }
    localStorage.setItem("navigation", JSON.stringify(navigation));
    this.router.navigate(['/' + destination]);
  }
  save(){
    const provider={
      name:this.name,
      phone:this.phone,
      email:this.email,
      description:this.description,
      credit:this.credit
    }

    this.providerService.addProvider(provider).subscribe(
      data=>{
        Swal.fire({
          title: 'Fournisseur ajouté',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageProviders');
      }
    )

  }
}

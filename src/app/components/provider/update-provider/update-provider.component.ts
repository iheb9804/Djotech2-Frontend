import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.scss']
})
export class UpdateProviderComponent implements OnInit {

  id;
  name;
  phone;
  email;
  description;
  credit;

  constructor(private providerService: ProviderService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProvider();

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

  getProvider() {
    this.providerService.getProvider(this.id).subscribe(data => {
      this.name = data.name;
      this.phone = data.phone;
      this.email = data.email;
      this.description = data.description;
      this.credit = data.credit;
    })
  }
  save() {
    const provider = {
      id:this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      description: this.description,
      credit:this.credit
    }

    this.providerService.updateProvider(provider).subscribe(
      data => {
        Swal.fire({
          title: 'Fournisseur modifié',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageProviders');
      }
    )

  }

}

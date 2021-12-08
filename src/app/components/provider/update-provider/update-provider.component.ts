import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

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

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProvider();

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
        console.log("dqddqdsqds");
        console.log(data);
      }
    )

  }

}

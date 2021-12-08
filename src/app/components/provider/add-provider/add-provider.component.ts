import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

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

  constructor(private providerService:ProviderService) { }

  ngOnInit(): void {
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
        console.log(data);
      }
    )

  }
}

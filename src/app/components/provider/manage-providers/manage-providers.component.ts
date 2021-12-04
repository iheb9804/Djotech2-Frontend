import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { faTrash,faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.css']
})
export class ManageProvidersComponent implements OnInit {

  providers;
  faTrash=faTrash;
  faEdit=faEdit;
  faPlus=faPlus;
  p;

  constructor(private router: Router, private providerService: ProviderService) { }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
    })
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

  removeProvider(element){
    console.log(element)
    this.providerService.deleteProvider(element._id).subscribe(data=>{
      console.log(data);
      this.getProviders();
    })
  }

  updateProvider(element){
    this.navigate("manageProviders/updateProvider/"+element._id);
  }
}

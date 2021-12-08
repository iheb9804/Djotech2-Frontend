import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { faTrash,faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
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
    Swal.fire({
      title: 'Supprimer le fournisseur ' + element.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteProvider(element._id).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Fournisseur supprimé',
            showConfirmButton: false,
            timer: 1500
          })
          this.getProviders();
        })
      }
    })
    
  }

  updateProvider(element){
    this.navigate("manageProviders/updateProvider/"+element._id);
  }
}

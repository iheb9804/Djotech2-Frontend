import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SpendingService } from 'src/app/services/spending.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-spendings',
  templateUrl: './manage-spendings.component.html',
  styleUrls: ['./manage-spendings.component.scss']
})
export class ManageSpendingsComponent implements OnInit {

  spendings;
  faTrash=faTrash;
  faEdit=faEdit;
  faPlus=faPlus;
  p;

  constructor(private router: Router, private spendingService: SpendingService) { }

  ngOnInit(): void {
    this.getSpendings();
  }

  getSpendings() {
    this.spendingService.getSpendings().subscribe(data => {
      this.spendings = data;
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

  removeSpending(element){
    Swal.fire({
      title: 'Supprimer cette dépense ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spendingService.deleteSpending(element._id).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Dépense supprimée',
            showConfirmButton: false,
            timer: 1500
          })
          this.getSpendings();
        })
      }
    })
    
  }

  updateSpending(element){
    this.navigate("manageSpendings/updateSpending/"+element._id);
  }

}

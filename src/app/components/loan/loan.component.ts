import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  borrowers;
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  p;

  constructor(private router: Router, private loanService: LoanService) { }

  ngOnInit(): void {
    this.getBorrowers();
  }

  getBorrowers() {
    this.loanService.getBorrowers().subscribe(data => {
      this.borrowers = data;
    })
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

  removeBorrower(element) {
    Swal.fire({
      title: 'Supprimer ' + element.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loanService.deleteBorrower(element._id).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: element.name + ' supprimé',
            showConfirmButton: false,
            timer: 1500
          })
          this.getBorrowers();
        })
      }
    })

  }

  updateBorrower(element) {
    this.navigate("manageLoans/updateBorrower/" + element._id);
  }

}

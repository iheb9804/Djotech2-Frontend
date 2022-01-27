import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { database } from 'firebase';
import { LoanService } from 'src/app/services/loan.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-borrower',
  templateUrl: './update-borrower.component.html',
  styleUrls: ['./update-borrower.component.scss']
})
export class UpdateBorrowerComponent implements OnInit {

  id;
  name;
  phone;
  date;
  comment;
  credit;

  constructor(private loanService: LoanService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProvider();
  }

  getProvider() {
    this.loanService.getBorrower(this.id).subscribe(data => {
      this.name = data.name;
      this.phone = data.phone;
      this.date = this.formatDate(data.date);
      this.comment = data.comment;
      this.credit = data.credit;
    })
  }

  formatDate(paramDate) {
    let date = new Date(paramDate);
    let year = date.getFullYear();
    let month = date.getMonth().toString().length == 1 ? "0" + date.getMonth() : date.getMonth();
    let day = date.getDay().toString().length == 1 ? "0" + date.getDay() : date.getDay();

    return year + "-" + month + "-" + day;
  }
  save() {
    const provider = {
      id: this.id,
      name: this.name,
      phone: this.phone,
      date: this.date,
      comment: this.comment,
      credit: this.credit
    }
    console.log(provider)

    this.loanService.updateBorrower(provider).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Mis à jour effectué',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/manageLoans']);
      }
    )

  }

  reset(){
    this.name="";
    this.phone="";
    this.credit=null;
    this.comment="";
    this.date=null;
  }

}

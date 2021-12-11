import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-borrower',
  templateUrl: './add-borrower.component.html',
  styleUrls: ['./add-borrower.component.scss']
})
export class AddBorrowerComponent implements OnInit {

  name;
  phone;
  date;
  comment;
  credit;

  constructor(private loanService:LoanService,
    private router:Router) { }

  ngOnInit(): void {
  }
  save(){
    const borrower={
      name:this.name,
      phone:this.phone,
      date:this.date,
      comment:this.comment,
      credit:this.credit
    }

    this.loanService.addBorrower(borrower).subscribe(
      data=>{
        Swal.fire({
          icon: 'success',
          title: 'Ajout effectué',
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

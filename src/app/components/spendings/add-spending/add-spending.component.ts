import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpendingService } from 'src/app/services/spending.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.scss']
})
export class AddSpendingComponent implements OnInit {
  comment;
  amount;
  date;

  constructor(private spendingService: SpendingService,private router:Router) { }

  ngOnInit(): void {
    let currentDate = new Date();
    this.date = currentDate.getFullYear() + "-" +
      (((currentDate.getMonth() + 1) < 10) ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)) + "-" +
      (((currentDate.getDate()) < 10) ? "0" + (currentDate.getDate()) : (currentDate.getDate()))

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

  save() {
    const spending = {
      comment: this.comment,
      amount: this.amount,
      date: this.date
    }

    this.spendingService.addSpending(spending).subscribe(
      data => {
        Swal.fire({
          title: 'Dépense enregistrée',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageSpendings');
      }
    )

  }

}

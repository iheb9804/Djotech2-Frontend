import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpendingService } from 'src/app/services/spending.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-spending',
  templateUrl: './update-spending.component.html',
  styleUrls: ['./update-spending.component.scss']
})
export class UpdateSpendingComponent implements OnInit {

  id;
  comment;
  date;
  amount;

  constructor(private spendingService: SpendingService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.getSpending();

  }

  getSpending() {
    this.spendingService.getSpending(this.id).subscribe(data => {
      let date = new Date(data.date)
      this.date = date.getFullYear() + "-" +
        (((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" +
        (((date.getDate()) < 10) ? "0" + (date.getDate()) : (date.getDate()));
      this.comment = data.comment;
      this.amount = data.amount;
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

  save() {
    const spending = {
      id: this.id,

      date: this.date,
      comment: this.comment,
      amount: this.amount
    }


    this.spendingService.updateSpending(spending).subscribe(
      data => {
        Swal.fire({
          title: 'Dépense modifié',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageSpendings');
      }
    )

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBoxOpen, faChartBar, faCoins, faHandHoldingUsd, faShippingFast } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faBoxOpen= faBoxOpen;
  faChartBar= faChartBar;
  faShippingfast= faShippingFast;
  faHandHoldingUsd = faHandHoldingUsd;
  faCoins = faCoins;

  constructor(private router:Router) { }

  ngOnInit(): void {
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

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faElementor } from '@fortawesome/free-brands-svg-icons';
import { faBoxOpen, faChartBar, faMobileAlt, faPalette, faShippingFast } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit {

  faMobileAlt= faMobileAlt;
  faElementor= faElementor;
  faPalette= faPalette;
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

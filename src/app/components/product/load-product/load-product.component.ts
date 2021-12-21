import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListenerService } from 'src/app/services/listener.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss']
})
export class LoadProductComponent implements OnInit {
  @Input() name;
  @Input() id;
  price;
  quantity;


  product = { _id: "", name: "", description: "", price: null, sellingPrice: null, category: null, brand: null, provider: null, color: null, state: null, quantity: null };
  form = new FormGroup({

    sellingPrice: new FormControl(''),
    quantity: new FormControl(''),

  })

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: NgbActiveModal,
    private listener: ListenerService) { }

  ngOnInit(): void {
    this.quantity = 1;
    this.getProduct();
  }

  load() {
    const body = {
      _id: this.product._id,
      price: this.price,
      quantity: this.quantity
    };
    this.productService.loadProduct(body).subscribe(
      data => {
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Opération enregistrée',
            showConfirmButton: false,
            timer: 1500
          })
          this.activeModal.close();
          this.listener.reloadProducts.next();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: data.err
          })
        }
      }
    )
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

  reset() {
    this.form.reset();
  }


  getProduct() {
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
      this.price = data.price;
    })
  }
}

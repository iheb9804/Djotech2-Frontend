import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {
  public uploader: FileUploader;
  selectedFile;
  name;
  price;
  sellingPrice;
  brand;
  provider;
  category;
  description;
  color;
  state;
  quantity;

  categories;
  providers;
  colors;
  states;
  brands;
  images;


  product = { name: "", description: "", price: null, sellingPrice: null, category: null, brand: null, provider: null, color: null, state: null, quantity: null };
  id;

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    sellingPrice: new FormControl(''),
    brand: new FormControl(''),
    provider: new FormControl(''),
    category: new FormControl(''),
    color: new FormControl(''),
    state: new FormControl(''),
    quantity: new FormControl(''),

  })

  constructor(private providerService: ProviderService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getProviders();
    this.categories = [{ name: "Kit", brands: ["Aspor", "Samsung", "GH"] }, { name: "Telephones", brands: ["Samsung", "Apple"] }]
    this.colors = ["Bleu", "Noir"]
    this.states = ["Neuf", "Bon occasion", "Occasion"]
    this.getProduct();
    this.images=["","","","",""]
  }

  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
    })
  }


  save() {
    let filesNames = [];
    let sec = 1;
    for (let item in this.uploader.queue) {
      let newName = "-" + (Date.now() + sec) + this.uploader.queue[0].file.name.substring(this.uploader.queue[0].file.name.lastIndexOf('.'));
      sec++;
      this.uploader.queue[item].file.name = newName;
      filesNames.push(newName);
    }
    this.uploader.uploadAll();
    this.uploader.queue = [];

    let product = {
      name: this.name,
      brand: this.brand,
      color: this.color,
      provider: this.provider,
      category: this.category,
      price: this.price,
      sellingPrice: this.sellingPrice,
      description: this.description,
      quantity: this.quantity,
      image: filesNames
    };
    this.productService.addProduct(product).subscribe(data => {
      console.log(product)
    })
  }
  reset() {
    this.form.reset();
  }
  

  getProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    })
  }
  removeImage(image){
    
  }

}

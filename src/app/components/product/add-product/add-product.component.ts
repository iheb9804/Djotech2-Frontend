import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public uploader: FileUploader;
  URL = 'http://localhost:3000/file-upload';
  selectedFile;

  faTrash=faTrash;

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

  constructor(private providerService:ProviderService,private productService:ProductService,private categoryService:CategoryService, private colorService:ColorService,private router:Router) { }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: this.URL + "/",
      itemAlias: 'image'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //this.toastr.success('File successfully uploaded!');
    };
    this.getProviders();
    this.getCategories();
    this.getColors();

    this.states=["Neuf","Bon occasion","Occasion"]

  }

  getProviders(){
    this.providerService.getProviders().subscribe(data=>{
      this.providers=data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(data=>{
      this.colors=data;
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;

    })
  }
  onFileChanged(event) {
    console.log(JSON.stringify(event));
    this.selectedFile = event.target.files[0]
  }

  save(){
    let filesNames = [];
    let sec = 1;
    for (let item in this.uploader.queue) {
      let newName = (Date.now() + sec) + this.uploader.queue[0].file.name.substring(this.uploader.queue[0].file.name.lastIndexOf('.'));
      sec++;
      this.uploader.queue[item].file.name = newName;
      filesNames.push(newName);
      console.log(this.uploader.queue);
    }
    this.uploader.uploadAll();
    console.log(this.category);
    let product={
      name:this.name,
      brand:this.brand,
      color:this.color,
      provider:this.provider,
      category:this.category._id,
      price:this.price,
      sellingPrice:this.sellingPrice,
      description:this.description,
      quantity:this.quantity,
      image:filesNames
    };
    this.productService.addProduct(product).subscribe(data=>{
      Swal.fire({
        title: 'Produit ajouté',
        text:'Voulez-vous ajouter un autre produit ?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Oui',
        confirmButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
                    this.navigate('manageProducts');
        }
      })
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
  reset(){
    this.form.reset();
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    // this.uploader.queue[0].file.name = "Name" + this.uploader.queue[0].file.name.substring(this.uploader.queue[0].file.name.lastIndexOf('.'));
    console.log(this.uploader.queue)
    console.log(file);
  }

}

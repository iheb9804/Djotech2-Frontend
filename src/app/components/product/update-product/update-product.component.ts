import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { GlobalVariable } from 'src/app/shared/global';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public uploader: FileUploader;
  URL = GlobalVariable.BASE_PATH+'/file-upload';
  IMAGE_BASE_PATH=GlobalVariable.IMAGE_BASE_PATH;
  selectedFile;
  faTimes=faTimes
  faTrash=faTrash


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


  product = { name: "", description: "", price: null, sellingPrice: null, category: null, brand: null, provider: null, color: null, state: null, quantity: null, image:null };
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

  constructor(private providerService: ProviderService, 
    private productService: ProductService, 
    private colorService:ColorService, 
    private categoryService:CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
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
    this.states = ["Neuf", "Bon occasion", "Occasion"]
  }

  getData(){
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
      this.colorService.getColors().subscribe(data=>{
        this.colors=data;
        this.categoryService.getCategories().subscribe(data=>{
          this.categories=data;
          this.productService.getProduct(this.id).subscribe(data => {
            this.product = data;
            console.log(this.product.category);
            this.product.category=this.categories.filter(item=>item._id==this.product.category)[0];
            console.log(this.product);
          })
        })
      })
    })
  }

  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
    })
  }

  onFileChanged(event) {
    console.log(JSON.stringify(event));
    this.selectedFile = event.target.files[0]
  }

  save() {
    let filesNames = [];
    let sec = 1;
    for (let item in this.uploader.queue) {
      let newName = (Date.now() + sec) + this.uploader.queue[0].file.name.substring(this.uploader.queue[0].file.name.lastIndexOf('.'));
      sec++;
      this.uploader.queue[item].file.name = newName;
      filesNames.push(newName);
    }
    this.uploader.uploadAll();
    this.product.image=this.product.image.concat(filesNames);
    this.productService.updateProduct(this.product).subscribe(data => {
      console.log(data)
    })
  }
  reset() {
    this.form.reset();
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    // this.uploader.queue[0].file.name = "Name" + this.uploader.queue[0].file.name.substring(this.uploader.queue[0].file.name.lastIndexOf('.'));
    console.log(this.uploader.queue)
    console.log(file);
  }

  getProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
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

 

  
  removeImage(image){
    this.product.image=this.product.image.filter(item=>item!=image)
  }
 
}

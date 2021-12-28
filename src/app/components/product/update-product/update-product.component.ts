import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { GlobalVariable } from 'src/app/shared/global';
import { finalize, tap, map, expand } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import Swal from 'sweetalert2';
import { SPINNER } from 'ngx-loading-x';
import { CompressorService } from 'src/app/services/compressor.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  public uploader: FileUploader;
  URL = GlobalVariable.BASE_PATH + '/file-upload';
  IMAGE_BASE_PATH = GlobalVariable.IMAGE_BASE_PATH;
  selectedFile;
  saveInProgress;
  spinnerType = SPINNER.xBallSpin;


  faTimes = faTimes
  faTrash = faTrash


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
  states = GlobalVariable.STATES;
  brands;
  images;

  //********* File upload */
  selectedFiles = [];
  data: FileList;
  compressedImages = [];


  product = { _id: "", name: "", description: "", price: null, sellingPrice: null, category: null, brand: null, provider: null, color: null, state: null, quantity: null, image: null };
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
    private colorService: ColorService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private afStorage: AngularFireStorage,
    private compressor:CompressorService) { }

  ngOnInit(): void {
    this.saveInProgress = false;
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
  }

  getData() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
      this.colorService.getColors().subscribe(data => {
        this.colors = data;
        this.categoryService.getCategories().subscribe(data => {
          this.categories = data;
          this.productService.getProduct(this.id).subscribe(data => {
            this.product = data;
            console.log(this.product.category);
            this.product.category = this.categories.filter(item => item._id == this.product.category)[0];
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
    let uploadedImages = 0;
    let numberOfFiles = this.compressedImages.length;
    this.saveInProgress = true;

    for (let element of this.compressedImages) {

      const randomId = Math.random().toString(36).substring(2);
      let newName = randomId + element.name.substring(element.name.lastIndexOf('.'));

      let path = '/images/' + newName;
      let ref = this.afStorage.ref(path);
      let task = this.afStorage.upload(path, element);

      task.snapshotChanges().pipe(
        tap(console.log),
        finalize(async () => {
          let downloadURL = await ref.getDownloadURL().toPromise();
          filesNames.push(downloadURL);
          uploadedImages++;
          if (uploadedImages == numberOfFiles) {

            let product = {
              _id: this.product._id,
              name: this.product.name,
              description: this.product.description,
              price: this.product.price,
              sellingPrice: this.product.sellingPrice,
              category: this.product.category,
              brand: this.product.brand,
              provider: this.product.provider,
              color: this.product.color,
              state: this.product.state,
              quantity: this.product.quantity,
              image: this.product.image.concat(filesNames)
            }
            this.updateProduct(product);
            //this.product.image = this.product.image.concat(filesNames);

          }
        })
      ).subscribe();
    }
    if (numberOfFiles == 0) {
      let product = {
        _id: this.product._id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        sellingPrice: this.product.sellingPrice,
        category: this.product.category,
        brand: this.product.brand,
        provider: this.product.provider,
        color: this.product.color,
        state: this.product.state,
        quantity: this.product.quantity,
        image: this.product.image
      }
      this.updateProduct(product);
    }

  }

  updateProduct(product) {
    this.productService.updateProduct(product).subscribe(data => {
      this.saveInProgress = false;
      Swal.fire({
        title: 'Produit modifié',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.navigate('manageProducts');
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
  reset() {
    this.form.reset();
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    // this.compressedImages[0].file.name = "Name" + this.compressedImages[0].file.name.substring(this.compressedImages[0].file.name.lastIndexOf('.'));
    console.log(this.compressedImages)
    console.log(file);
  }

  getProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(data => {
      this.colors = data;
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }


  removeImage(image) {
    this.product.image = this.product.image.filter(item => item != image)
  }

  recursiveCompress = (image: File, index, array) => {
    return this.compressor.compress(image).pipe (
      map(response => {

      //Code block after completing each compression
        console.log('compressed ' + index + image.name);
        this.compressedImages.push(response);
        return {
          data: response,
          index: index + 1,
          array: array,
        };
      }),
    );
  }

//process files for upload
  public process (event) {
  this.data = event.target.files;
  this.compressedImages=[];
  console.log('input: '  + this.data);
  const compress = this.recursiveCompress( this.data[0], 0, this.data ).pipe(
    expand(res => {
      return res.index > res.array.length - 1
        ? EMPTY
        : this.recursiveCompress( this.data[res.index], res.index, this.data );
    }),
  );
  compress.subscribe(res => {
    if (res.index > res.array.length - 1) {


    //Code block after completing all compression
      console.log('Compression successful ' + this.compressedImages);
    }
  });
}
}

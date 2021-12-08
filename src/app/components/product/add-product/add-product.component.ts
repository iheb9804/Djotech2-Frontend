import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBullseye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SPINNER } from 'ngx-loading-x';
import { finalize, tap, map, expand } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { GlobalVariable } from 'src/app/shared/global';
import Swal from 'sweetalert2';
import { CompressorService } from 'src/app/services/compressor.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public uploader: FileUploader;
  URL = GlobalVariable.BASE_PATH + '/file-upload';
  selectedFile;
  saveInProgress = false;
  spinnerType = SPINNER.xBallSpin;


  faTrash = faTrash;

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

  //    Firebase
  selectedFiles;
  data: FileList;
  compressedImages = [];


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
    private categoryService: CategoryService,
    private colorService: ColorService,
    private router: Router,
    private afStorage: AngularFireStorage,
    private compressor: CompressorService) { }

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
  }

  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
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
  onFileChanged(event) {
    console.log(JSON.stringify(event));
    this.selectedFile = event.target.files[0]
  }

  save() {
    this.saveInProgress = true;
    console.log(this.compressedImages)
    if (this.compressedImages.length > 0) {
      let filesNames = [];
      let uploadedImages = 0;
      let numberOfFiles = this.compressedImages.length;

      for (let element of this.compressedImages) {

        const randomId = Math.random().toString(36).substring(2);
        let newName = randomId + element.name.substring(element.name.lastIndexOf('.'));

        let path = '/images/' + newName;
        let ref = this.afStorage.ref(path);
        console.log(element)
        let task = this.afStorage.upload(path, element);
        task.snapshotChanges().pipe(
          tap(console.log),
          finalize(async () => {
            let downloadURL = await ref.getDownloadURL().toPromise();
            filesNames.push(downloadURL);
            uploadedImages++;
            if (uploadedImages == numberOfFiles) {

              let product = {
                name: this.name,
                brand: this.brand,
                color: this.color,
                provider: this.provider,
                category: this.category?._id,
                price: this.price,
                sellingPrice: this.sellingPrice,
                description: this.description,
                quantity: this.quantity,
                image: filesNames
              };

              this.saveProduct(product);

            }
          })
        ).subscribe();
      }
    } else {
      let product = {
        name: this.name,
        brand: this.brand,
        color: this.color,
        provider: this.provider,
        category: this.category?._id,
        price: this.price,
        sellingPrice: this.sellingPrice,
        description: this.description,
        quantity: this.quantity,
        image: []
      };
      this.saveProduct(product);
    }

  }


  saveProduct(product) {
    this.productService.addProduct(product).subscribe(data => {
      this.saveInProgress = false;
      Swal.fire({
        title: 'Produit ajouté',
        text: 'Voulez-vous ajouter un autre produit ?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Oui',
        confirmButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.navigate('manageProducts');
        } else {
          this.name = "";
          this.brand = "";
          this.color = null;
          this.provider = null;
          this.category = null;
          this.price = null;
          this.sellingPrice = null;
          this.description = "";
          this.quantity = null;
          this.compressedImages = [];
        }
      })
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
  upload(event) {
    console.log(event.target.files)
    this.selectedFiles = event.target.files;
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

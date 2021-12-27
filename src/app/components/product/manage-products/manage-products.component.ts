import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faFilter, faImage, faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ListenerService } from 'src/app/services/listener.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { GlobalVariable } from 'src/app/shared/global';
import Swal from 'sweetalert2';
import { ViewImagesComponent } from '../../modals/view-images/view-images.component';
import { LoadProductComponent } from '../load-product/load-product.component';
import { SellProductComponent } from '../sell-product/sell-product.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  
  loading;
  page;

  IMAGE_BASE_PATH = GlobalVariable.IMAGE_BASE_PATH;
  faSearch = faSearch;
  faFilter = faFilter;
  faEdit = faEdit;
  faPlus = faPlus;
  faTimes = faTimes;
  faImage=faImage;



  products;
  filtredProducts;

  color;
  category;
  brand;
  state;
  provider;
  searchable;
  maxPrice;
  minPrice
  maxQuantity;
  minQuantity;

  showFilters = false;


  colors;
  categories;
  brands;
  states = GlobalVariable.STATES;
  providers;

  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private providerService: ProviderService,
    private modalService: NgbModal,
    private listener: ListenerService) { }

  ngOnInit(): void {
    this.loading=true;
    this.getDetails();
    this.listener.reloadProducts.subscribe(
      () =>
        this.getProducts()
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

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.loading=false;
      this.products.forEach(element => {
        element.category = this.toCategory(element.category);
        element.color = this.toColor(element.color);
        element.provider = this.toProvider(element.provider);
      });
      this.products = this.products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filtredProducts = this.products;
      
    })
  }
  getDetails() {
    this.getCategories();

  }
  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
      this.getProducts();
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(data => {
      this.colors = data;
      this.getProviders();

    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.getColors();

    })
  }
  search() {
    this.filtredProducts = this.products;
    console.log("Searchable : ",this.searchable);
    if (this.searchable != undefined && this.searchable != null)
      this.filtredProducts = this.filtredProducts.filter(item => ((item.name?.toUpperCase()?.indexOf(this.searchable?.toUpperCase()) != -1) ||
        (item.description?.toUpperCase()?.indexOf(this.searchable?.toUpperCase()) != -1)));

  }

  toCategory(id) {
    let result = "--";
    this.categories.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  toProvider(id) {
    let result = "--";
    this.providers.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  toColor(id) {
    let result = "--";
    this.colors.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  searchWithFilters() {
    this.filtredProducts = this.products;
    if (this.color != undefined && this.color != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.color == this.color.name);

    if (this.category != undefined && this.category != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.category == this.category.name);

    if (this.brand != undefined && this.brand != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.brand == this.brand);

    if (this.state != undefined && this.state != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.state == this.state);

    if (this.provider != undefined && this.provider != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.provider == this.provider.name);


    if (this.minPrice != undefined && this.minPrice != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.sellingPrice >= this.minPrice);

    if (this.maxPrice != undefined && this.maxPrice != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.sellingPrice <= this.maxPrice);


    if (this.minQuantity != undefined && this.minQuantity != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.quantity >= this.minQuantity);

    if (this.maxQuantity != undefined && this.maxQuantity != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.quantity <= this.maxQuantity);

  }
  reset() {
    this.color = null;
    this.brand = null;
    this.provider = null;
    this.category = null;
    this.state = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.minQuantity = null;
    this.maxQuantity = null;

    this.filtredProducts = this.products;
  }

  openModal(product) {
    const modalRef = this.modalService.open(ViewImagesComponent, { size: 'xl'});
    modalRef.componentInstance.product = product;
  }

  sellingModal(id, name) {
    const modalRef = this.modalService.open(SellProductComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.name = name;
  }

  loadingModal(id, name) {
    const modalRef = this.modalService.open(LoadProductComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.name = name;
  }

  deleteProduct(product) {
    Swal.fire({
      title: 'Supprimer le produit ' + product.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product._id).subscribe(data => {
          this.products = this.products.filter(item => item._id != product._id);
          this.filtredProducts = this.filtredProducts.filter(item => item._id != product._id);
          Swal.fire({
            icon: 'success',
            title: 'Produit supprimé',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })
  }

}

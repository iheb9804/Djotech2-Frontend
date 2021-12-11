import { Component, OnInit } from '@angular/core';
import { faArchive, faCashRegister, faFileInvoiceDollar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Icons
  faArchive = faArchive;
  faCashRegister = faCashRegister;
  faHandHoldingUsd = faHandHoldingUsd;
  faFileInvoiceDollar = faFileInvoiceDollar;



  //Pagination 
  sellingPage;
  loadingPage;
  returningPage;

  // Arrays
  stats;
  products;
  sellingOperations;
  loadingOperations;
  returningOperations;
  categories;


  // Widgets
  stockInTrade;
  totalValue;
  netWorth;
  loan;
  debt;


  //Operations
  selectedOperations;
  selectedDate;




  constructor(private statService: StatService,
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getData();
    this.selectedOperations = "SOLD";
    this.selectedDate = "DAILY";
    this.stockInTrade = 50000;
  }


  getData() {
    this.getCategories();
  }

  getStats() {
    this.statService.getStats().subscribe(data => {
      this.stats = data;
      this.getProducts();
    })
  }

  getProducts() {
    this.productService.getDashboardProducts().subscribe(data => {
      for (let product of data) {
        product.category = this.toCategory(product.category);
      }
      this.products = data;
      this.getOperations();
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.getStats();
    })
  }

  getOperations() {
    this.sellingOperations = [];
    this.loadingOperations = [];
    this.returningOperations = [];
    for (let stat of this.stats) {
      let product = this.getProduct(stat.productID);
      let cell = {
        product: product,
        quantity: stat.quantity,
        price: stat.price,
        //gain: product?.price ? (stat.price - product.price) : null,
        date: stat.date
      }
      if (stat.type == "SOLD") {
        this.sellingOperations.push(cell);
      } else if (stat.type == "LOADED") {
        this.loadingOperations.push(cell);
      } else {
        this.returningOperations.push(cell);
      }

    }
    this.loadingOperations = this.loadingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.sellingOperations = this.sellingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.loadingOperations = this.loadingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getProduct(id) {
    return this.products.filter(item => item._id == id)[0];
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









  // ****************************** CHARTS *************************************
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}

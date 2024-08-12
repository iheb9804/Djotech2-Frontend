import { Component, OnInit } from '@angular/core';
import { faArchive, faCashRegister, faFileInvoiceDollar, faHandHoldingUsd, faHeadphones, faMobileAlt, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StatService } from 'src/app/services/stat.service';
import { GlobalVariable } from 'src/app/shared/global';
import Swal from 'sweetalert2';

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
  faMobileAlt = faMobileAlt;
  faHeadphones = faHeadphones;
  faTags = faTags;
  faTrash = faTrash;
  years = []


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
  phonesValue;
  accessoriesValue;
  netAccessories;
  phonesTradeValue;
  netWorth;
  mobilesNetWorth;
  loan;
  debt;


  //Operations
  selectedOperations;
  selectedDate;

  filterMonth;
  filterYear;
  filterWeek;
  filterDay;


  userUsageHoursData;
  netData;

  months = GlobalVariable.MONTHES;
  days = [];
  daysOfWeek = [];
  hours = [];

  userAppData;
  sellingBarChartData;
  loadingBarChartData;
  options;
  optionsBarChart;

  dashboardToBeDisplayed;
  password;
  passwordAvailable;
  confirmPassword;
  passwordsMatch = true;
  user;

  constructor(private statService: StatService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }



  ngOnInit(): void {
    for (let i = 2021; i <= new Date().getFullYear(); i++) {
      this.years.push(i)
    }
    this.user = this.authService.getConnectedUser();
    this.authService.checkPasswordAvailability({ login: this.user.login }).subscribe(
      data => {
        this.passwordAvailable = data.success;

      }
    )
    this.dashboardToBeDisplayed = false;
    this.getData();

    this.filterDay = new Date().getFullYear() + "-" +
      ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" +
      ((new Date().getDate()) < 10 ? "0" + (new Date().getDate()) : (new Date().getDate()));

    this.filterMonth = new Date().getFullYear() + "-" +
      ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1));

    this.filterYear = 2021;
    /*
    this.filterWeek = new Date().getFullYear() + "-W" +
      ((this.getWeek(new Date())) < 10 ? "0" + (this.getWeek(new Date())) : (this.getWeek(new Date())));
    */
    this.selectedOperations = "SOLD";
    this.selectedDate = "MONTHLY";
    this.setWidgetsValues();
    this.sellingBarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.loadingBarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // ***************************************************




    let phoneLabel = undefined;
    phoneLabel = this.toCategory("66b5eb99e806fb161d7e8405");
    console.log(phoneLabel)
    this.userAppData = {

      labels: [phoneLabel, phoneLabel && phoneLabel != "--" ? "Accessoirs" : "--"],
      datasets: [
        {
          data: [
            0,
            0,
          ],
          backgroundColor: [
            '#ff0000',
            '#FFBB00',
          ],
        },
      ],
    };
    this.optionsBarChart = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true   // minimum value will be 0.
          }
        }]
      },
      //display labels on data elements in graph
      plugins: {

        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: 'teal',
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 10,
        },
        legend: {
          position: 'bottom',
        },
      },
    };

    this.options = {

      //display labels on data elements in graph
      plugins: {

        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: 'teal',
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
        // display chart title
        title: {
          display: true,
          fontSize: 10,
        },
        legend: {
          position: 'bottom',
        },
      },
    };
    // ****************************************
  }

  loadCharts(date) {
    console.log(date);
    console.log(this.filterYear);
    console.log((new Date()).getFullYear());
    this.selectedDate = date;
    this.getOperations();
  }


  setPieChart() {
    let totalTelephones = 0;
    let netTelephones = 0;
    let netAccessoirs = 0;
    let totalAccessoirs = 0;


    if (this.selectedDate == "DAILY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      for (let operation of sellingOperations) {
        if (new Date(operation.date).getDate() == new Date(this.filterDay).getDate()) {
          if (operation.product?.category == this.toCategory("66b5eb99e806fb161d7e8405")) {
            totalTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          } else if (operation.product != undefined) {
            totalAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          }
        }
      }
    }

    /*
    if (this.selectedDate == "WEEKLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sellingBarChartData = [];
      this.daysOfWeek = [];

      for (let i = 0; i < 7; i++) {
        this.sellingBarChartData.push(0);
        this.daysOfWeek.push(i + 1);
      }

      for (let operation of sellingOperations) {
        let startCounter = 0;
        let weekFound = false;
        console.log(this.getWeek(new Date(operation.date)), this.getWeek(new Date(this.filterWeek)),
          (new Date(operation.date).getFullYear(), new Date(this.filterWeek).getFullYear()))
        if (this.getWeek(new Date(operation.date)) == this.getWeek(new Date(this.filterWeek)) &&
          (new Date(operation.date).getFullYear() == new Date(this.filterWeek).getFullYear())) {
          if (!weekFound) {
            startCounter = new Date(operation.date).getDate();
            console.log(startCounter)
          }
          this.sellingBarChartData[new Date(operation.date).getDate() - startCounter] += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
        }
      }
    }
    */

    if (this.selectedDate == "MONTHLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sellingBarChartData = [];
      this.days = [];
      for (let i = 0; i < this.lastDay(new Date(this.filterMonth).getFullYear(), new Date(this.filterMonth).getMonth()); i++) {
        this.sellingBarChartData.push(0);
        this.days.push(i + 1);
      }
      for (let operation of sellingOperations) {
        if (new Date(operation.date).getMonth() == new Date(this.filterMonth).getMonth() &&
          new Date(operation.date).getFullYear() == new Date(this.filterMonth).getFullYear()) {
          if (operation.product?.category == this.toCategory("66b5eb99e806fb161d7e8405")) {
            totalTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          } else if (operation.product != undefined) {
            totalAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          }
        }
      }

    }

    if (this.selectedDate == "ANNUALLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());

      for (let operation of sellingOperations) {
        console.log(new Date(operation.date).getFullYear() == this.filterYear)
        if (new Date(operation.date).getFullYear() == this.filterYear) {
          if (operation.product?.category == this.toCategory("66b5eb99e806fb161d7e8405")) {
            totalTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netTelephones += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          } else if (operation.product != undefined) {
            totalAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
            netAccessoirs += (operation?.price && operation?.quantity && operation?.product?.price) ? (operation?.price - operation?.product?.price) * operation?.quantity : 0
          }
        }
      }
    }
    let phoneLabel = undefined;
    phoneLabel = this.toCategory("66b5eb99e806fb161d7e8405");
    this.userAppData = {

      labels: [phoneLabel, phoneLabel && phoneLabel != "--" ? "Accessoirs" : "--"],
      datasets: [
        {
          data: [
            totalTelephones,
            totalAccessoirs,
          ],
          backgroundColor: [
            '#ff0000',
            '#FFBB00',
          ],
        },
      ],
    };

    this.netData = {

      labels: [phoneLabel, phoneLabel && phoneLabel != "--" ? "Accessoirs" : "--"],
      datasets: [
        {
          data: [
            netTelephones,
            netAccessoirs,
          ],
          backgroundColor: [
            '#ff0000',
            '#FFBB00',
          ],
        },
      ],
    };

  }




  setSellingBarChartData() {
    if (this.selectedDate == "DAILY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sellingBarChartData = [];
      this.hours = [];
      for (let i = 0; i < 24; i++) {
        this.sellingBarChartData.push(0);

        this.hours.push(i < 10 ? "0" + i : i);
      }
      for (let operation of sellingOperations) {
        let operationDate = new Date(operation.date);
        let filterDayDate = new Date(this.filterDay);
        if (operationDate.getFullYear() == filterDayDate.getFullYear() &&
          operationDate.getMonth() == filterDayDate.getMonth() &&
          operationDate.getDate() == filterDayDate.getDate()
        )
          this.sellingBarChartData[new Date(operation.date).getHours()] += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.hours,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };

    }
    /*
    if (this.selectedDate == "WEEKLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sellingBarChartData = [];
      this.daysOfWeek = [];

      for (let i = 0; i < 7; i++) {
        this.sellingBarChartData.push(0);
        this.daysOfWeek.push(i + 1);
      }

      for (let operation of sellingOperations) {
        let startCounter = 0;
        let weekFound = false;
        console.log(this.getWeek(new Date(operation.date)), this.getWeek(new Date(this.filterWeek)),
          (new Date(operation.date).getFullYear(), new Date(this.filterWeek).getFullYear()))
        if (this.getWeek(new Date(operation.date)) == this.getWeek(new Date(this.filterWeek)) &&
          (new Date(operation.date).getFullYear() == new Date(this.filterWeek).getFullYear())) {
          if (!weekFound) {
            startCounter = new Date(operation.date).getDate();
            console.log(startCounter)
          }
          this.sellingBarChartData[new Date(operation.date).getDate() - startCounter] += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
        }
      }

      this.userUsageHoursData = {
        labels: this.daysOfWeek,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };

    }
    */

    if (this.selectedDate == "MONTHLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.sellingBarChartData = [];
      this.days = [];
      for (let i = 0; i < this.lastDay(new Date(this.filterMonth).getFullYear(), new Date(this.filterMonth).getMonth()); i++) {
        this.sellingBarChartData.push(0);
        this.days.push(i + 1);
      }
      for (let operation of sellingOperations) {
        if (new Date(operation.date).getMonth() == new Date(this.filterMonth).getMonth() &&
          new Date(operation.date).getFullYear() == new Date(this.filterMonth).getFullYear())
          this.sellingBarChartData[new Date(operation.date).getDate() - 1] += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.days,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };

    }

    if (this.selectedDate == "ANNUALLY") {
      let sellingOperations = this.sellingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());

      this.sellingBarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let operation of sellingOperations) {
        console.log(operation);
        this.sellingBarChartData[new Date(operation.date).getMonth()] += (operation?.price && operation?.quantity && operation?.product?.price) ? operation?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.months,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };
    }
    this.setLoadingBarChartData();

  }

  setLoadingBarChartData() {

    if (this.selectedDate == "DAILY") {
      let loadingOperations = this.loadingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.loadingBarChartData = [];
      this.hours = [];
      for (let i = 0; i < 24; i++) {
        this.loadingBarChartData.push(0);
        this.hours.push(i < 10 ? "0" + i : i);
      }
      for (let operation of loadingOperations) {
        let operationDate = new Date(operation.date);
        let filterDayDate = new Date(this.filterDay);
        if (operationDate.getFullYear() == filterDayDate.getFullYear() &&
          operationDate.getMonth() == filterDayDate.getMonth() &&
          operationDate.getDate() == filterDayDate.getDate()
        )
          this.loadingBarChartData[new Date(operation.date).getHours()] += (operation?.product?.price && operation?.quantity) ? operation?.product?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.hours,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };

    }
    /*
    if (this.selectedDate == "WEEKLY") {
      let loadingOperations = this.loadingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.loadingBarChartData = [];
      this.daysOfWeek = [];

      for (let i = 0; i < 7; i++) {
        this.loadingBarChartData.push(0);
        this.daysOfWeek.push(i + 1);
      }

      for (let operation of loadingOperations) {
        let startCounter = 0;
        let weekFound = false;
        console.log(this.getWeek(new Date(operation.date)), this.getWeek(new Date(this.filterWeek)),
          (new Date(operation.date).getFullYear(), new Date(this.filterWeek).getFullYear()))
        if (this.getWeek(new Date(operation.date)) == this.getWeek(new Date(this.filterWeek)) &&
          (new Date(operation.date).getFullYear() == new Date(this.filterWeek).getFullYear())) {
          if (!weekFound) {
            startCounter = new Date(operation.date).getDate();
          }
          this.loadingBarChartData[new Date(operation.date).getDate() - startCounter] += (operation?.product?.price && operation?.quantity) ? operation?.product?.price * operation?.quantity : 0
        }
      }

      this.userUsageHoursData = {
        labels: this.daysOfWeek,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };

    }
    */

    if (this.selectedDate == "MONTHLY") {
      let loadingOperations = this.loadingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.loadingBarChartData = [];
      this.days = [];
      for (let i = 0; i < this.lastDay(new Date(this.filterMonth).getFullYear(), new Date(this.filterMonth).getMonth()); i++) {
        this.loadingBarChartData.push(0);
        this.days.push(i + 1);
      }
      for (let operation of loadingOperations) {
        if (new Date(operation.date).getMonth() == new Date(this.filterMonth).getMonth() &&
          new Date(operation.date).getFullYear() == new Date(this.filterMonth).getFullYear())
          this.loadingBarChartData[new Date(operation.date).getDate() - 1] += (operation?.product?.price && operation?.quantity) ? operation?.product?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.days,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };
    }

    if (this.selectedDate == "ANNUALLY") {
      let loadingOperations = this.loadingOperations?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.loadingBarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let operation of loadingOperations) {
        this.loadingBarChartData[new Date(operation.date).getMonth()] += (operation?.product?.price && operation?.quantity) ? operation?.product?.price * operation?.quantity : 0
      }
      this.userUsageHoursData = {
        labels: this.months,
        datasets: [
          {
            label: 'Chargé',
            backgroundColor: 'red',
            data: this.loadingBarChartData,
          },
          {
            label: 'Vendu',
            backgroundColor: '#42A5F5',
            data: this.sellingBarChartData,
          }
        ],
      };
    }
    this.setPieChart();
  }



  /*
  getWeek(dt) {
    let dtInst;
    var calc = function (o) {
      if (o.dtmin.getDay() != 1) {
        if (o.dtmin.getDay() <= 4 && o.dtmin.getDay() != 0) o.w += 1;
        o.dtmin.setDate((o.dtmin.getDay() == 0) ? 2 : 1 + (7 - o.dtmin.getDay()) + 1);
      }
      o.w += Math.ceil((((o.dtmax.getTime() - o.dtmin.getTime()) / (24 * 60 * 60 * 1000)) + 1) / 7);
    }, getNbDaysInAMonth = function (year, month) {
      var nbdays = 31;
      for (var i = 0; i <= 3; i++) {
        nbdays = nbdays - i;
        if ((dtInst = new Date(year, month - 1, nbdays)) && dtInst.getDate() == nbdays && (dtInst.getMonth() + 1) == month && dtInst.getFullYear() == year)
          break;
      }
      return nbdays;
    };
    if (dt.getMonth() + 1 == 1 && dt.getDate() >= 1 && dt.getDate() <= 3 && (dt.getDay() >= 5 || dt.getDay() == 0)) {
      var pyData = { "dtmin": new Date(dt.getFullYear() - 1, 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear() - 1, 11, getNbDaysInAMonth(dt.getFullYear() - 1, 12), 0, 0, 0, 0), "w": 0 };
      calc(pyData);
      return pyData.w;
    } else {
      var ayData = { "dtmin": new Date(dt.getFullYear(), 0, 1, 0, 0, 0, 0), "dtmax": new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0), "w": 0 },
        nd12m = getNbDaysInAMonth(dt.getFullYear(), 12);
      if (dt.getMonth() == 12 && dt.getDay() != 0 && dt.getDay() <= 3 && nd12m - dt.getDate() <= 3 - dt.getDay()) ayData.w = 1; else calc(ayData);
      return ayData.w;
    }
  }
  */

  getData() {
    this.getCategories();
  }

  setWidgetsValues() {
    this.statService.getDebts().subscribe(data => {
      this.debt = this.round(data.total, 1);
    })

    this.statService.getLoans().subscribe(data => {
      this.loan = this.round(data.total, 1);
    })

    this.statService.getTotalValue().subscribe((data: any) => {
      this.totalValue = this.round(data.total, 1);
      this.statService.getStockInTrade().subscribe(data => {
        this.stockInTrade = this.round(data.total, 1);
        this.netWorth = this.round(this.totalValue - this.stockInTrade, 1);
      })
      this.statService.getPhonesValue().subscribe(data => {
        this.phonesValue = this.round(data.total, 1);
        this.statService.getPhonesTradeValue().subscribe(data => {
          this.phonesTradeValue = data.total
          this.accessoriesValue = this.round(this.totalValue - this.phonesValue, 1);

          this.mobilesNetWorth = this.round(this.phonesValue - data.total, 1)
          this.netAccessories = this.round(this.netWorth - this.mobilesNetWorth, 1);

          console.log(this.stockInTrade, this.phonesTradeValue)
        })

      })
    })


  }

  undoOperation(element, type) {
    Swal.fire({
      title: 'Supprimer l\'opération ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.statService.undoOperation(element.id).subscribe(
          data => {
            console.log(element);
            let quantity = element.product.quantity + (type == "SOLD" ? element.quantity : -element.quantity);
            let product = {
              _id: element.product._id,
              quantity: quantity
            }
            this.productService.updateProduct(product).subscribe(
              data => {
                Swal.fire({
                  icon: 'success',
                  title: 'Operation supprimée',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.getStats();
              }
            )
          }
        )
      }
    })
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
      if (this.selectedDate == "DAILY") {
        let operationDate = new Date(stat.date);
        let filterDayDate = new Date(this.filterDay);
        if (operationDate.getFullYear() == filterDayDate.getFullYear() &&
          operationDate.getMonth() == filterDayDate.getMonth() &&
          operationDate.getDate() == filterDayDate.getDate()
        ) {
          let product = this.getProduct(stat.productID);
          let cell = {
            id: stat._id,
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
      } else if (this.selectedDate == "MONTHLY") {
        if (new Date(stat.date).getMonth() == new Date(this.filterMonth).getMonth() &&
          new Date(stat.date).getFullYear() == new Date(this.filterMonth).getFullYear()) {
          let product = this.getProduct(stat.productID);
          let cell = {
            id: stat._id,
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
      } else if (this.selectedDate == "ANNUALLY") {
        if (new Date(stat.date).getFullYear() == this.filterYear) {
          let product = this.getProduct(stat.productID);
          let cell = {
            id: stat._id,
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
      }


    }
    this.loadingOperations = this.loadingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.sellingOperations = this.sellingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.loadingOperations = this.loadingOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.setSellingBarChartData();
  }

  getProduct(id) {
    return this.products.filter(item => item._id == id)[0];
  }

  toCategory(id) {
    let result = "--";
    this.categories?.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }










  lastDay(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }



  //================ Password ===================

  savePassword() {
    if (this.password == "" || this.password == null || this.password == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Le mot de passe ne doit pas être vide',
        showConfirmButton: false,
        timer: 2500
      })
    } else if (this.password == this.confirmPassword) {
      this.authService.savePassword({ login: this.user.login, password: this.password }).subscribe(
        data => {
          this.dashboardToBeDisplayed = true;
          Swal.fire({
            icon: 'success',
            title: 'Mot de passe ajouté',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Les 2 mots de passes sont différents',
        showConfirmButton: false,
        timer: 2500
      })
    }

  }

  checkPassword() {
    if (this.password != "" && this.password != null)
      this.authService.checkPassword({ login: this.user.login, password: this.password }).subscribe(
        data => {
          this.dashboardToBeDisplayed = data.success;
          if (data.success == false) {
            Swal.fire({
              icon: 'error',
              title: 'Mot de passe incorrect',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Mot de passe correcte, Bienvenue !',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      )
  }

  reset() {
    this.password = "";
    this.confirmPassword = "";
  }
}

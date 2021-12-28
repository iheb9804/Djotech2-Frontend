import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';
import { AddProviderComponent } from './components/provider/add-provider/add-provider.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ManageCategoriesComponent } from './components/category/manage-categories/manage-categories.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorComponent } from './components/color/color.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { SellProductComponent } from './components/product/sell-product/sell-product.component';
import { ViewImagesComponent } from './components/modals/view-images/view-images.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageInventoryComponent } from './components/inventory/manage-inventory/manage-inventory.component';
import { LoadProductComponent } from './components/product/load-product/load-product.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanComponent } from './components/loan/loan.component';
import { AddBorrowerComponent } from './components/loan/add-borrower/add-borrower.component';
import { UpdateBorrowerComponent } from './components/loan/update-borrower/update-borrower.component';
import { ChartModule } from 'primeng/chart';
import { ManageSpendingsComponent } from './components/spendings/manage-spendings/manage-spendings.component';
import { AddSpendingComponent } from './components/spendings/add-spending/add-spending.component';
import { UpdateSpendingComponent } from './components/spendings/update-spending/update-spending.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ManageProductsComponent,
    AddProductComponent,
    ManageProvidersComponent,
    AddProviderComponent,
    ManageCategoriesComponent,
    AddCategoryComponent,
    UpdateProviderComponent,
    ColorComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    SellProductComponent,
    ViewImagesComponent,
    ManageInventoryComponent,
    LoadProductComponent,
    DashboardComponent,
    LoanComponent,
    AddBorrowerComponent,
    UpdateBorrowerComponent,
    ManageSpendingsComponent,
    AddSpendingComponent,
    UpdateSpendingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgxPaginationModule,
    NgbModule,
    ChartModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBk5TAgXRUx-nXKqCMhegRI3efNpwbUxNw",
      authDomain: "djotech-94d44.firebaseapp.com",
      projectId: "djotech-94d44",
      storageBucket: "djotech-94d44.appspot.com",
      messagingSenderId: "604558925056",
      appId: "1:604558925056:web:1434d42c25e8e54a1867e5"
    }),
    AngularFireStorageModule,
    NgxLoadingXModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }

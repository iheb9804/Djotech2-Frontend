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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorComponent } from './components/color/color.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { SellProductComponent } from './components/product/sell-product/sell-product.component';
import { ViewImagesComponent } from './components/modals/view-images/view-images.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageInventoryComponent } from './components/inventory/manage-inventory/manage-inventory.component';

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
    ManageInventoryComponent
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
    NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

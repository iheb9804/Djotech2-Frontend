import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ManageCategoriesComponent } from './components/category/manage-categories/manage-categories.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { ColorComponent } from './components/color/color.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ManageInventoryComponent } from './components/inventory/manage-inventory/manage-inventory.component';
import { AddBorrowerComponent } from './components/loan/add-borrower/add-borrower.component';
import { LoanComponent } from './components/loan/loan.component';
import { UpdateBorrowerComponent } from './components/loan/update-borrower/update-borrower.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { SellProductComponent } from './components/product/sell-product/sell-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { AddProviderComponent } from './components/provider/add-provider/add-provider.component';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { AddSpendingComponent } from './components/spendings/add-spending/add-spending.component';
import { ManageSpendingsComponent } from './components/spendings/manage-spendings/manage-spendings.component';
import { UpdateSpendingComponent } from './components/spendings/update-spending/update-spending.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [


  //  Authentication 
  { path: 'login', component: LoginComponent },

  // Manage Inventory
  { path: 'manageInventory', component: ManageInventoryComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Products
  { path: 'manageProducts', component: ManageProductsComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/addProduct', component: AddProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/updateProduct/:id', component: UpdateProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/sellProduct/:id', component: SellProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Colors
  { path: 'manageColors', component: ColorComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageColors/addColor', component: AddProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Providers
  { path: 'manageProviders', component: ManageProvidersComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProviders/addProvider', component: AddProviderComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProviders/updateProvider/:id', component: UpdateProviderComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Categories
  { path: 'manageCategories', component: ManageCategoriesComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageCategories/addCategory', component: AddCategoryComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageCategories/updateCategory/:id', component: UpdateCategoryComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


   //  Manage Spendings
   { path: 'manageSpendings', component: ManageSpendingsComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
   { path: 'manageSpendings/addSpending', component: AddSpendingComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
   { path: 'manageSpendings/updateSpending/:id', component: UpdateSpendingComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
 

  //  Dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Loan
  { path: 'manageLoans', component: LoanComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageLoans/addBorrower', component: AddBorrowerComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageLoans/updateBorrower/:id', component: UpdateBorrowerComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },




  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  
  brands;
  faTrash = faTrash
  valid;

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    brand: new FormControl('')
  })

  constructor(private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
    this.valid=false;
    this.brands=[]
  }
  exist(brand){
    return this.brands.filter(item=>item?.toUpperCase()==brand?.toUpperCase()).length>0;
  }

  addBrand(){
    if (!this.exist(this.form.value.brand) && this.form.value.brand!="") this.brands.push(this.form.value.brand);
  }

  removeBrand(item){
    console.log(item)
    this.brands=this.brands.filter(element=>element!=item);
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
  
  save(){
    this.valid=true;
    if (this.form.valid){
      this.valid=false;
      let category={
        name:this.form.value.name,
        brands:this.brands
      }
      this.categoryService.addCategory(category).subscribe(data=>{
        Swal.fire({
          title: 'Catégorie enregistrée',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageCategories');
      })
    }
  }

}

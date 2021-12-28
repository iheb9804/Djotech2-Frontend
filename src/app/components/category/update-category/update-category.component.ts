import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  faTrash = faTrash
  valid;
  id;
  category={name:"",brands:[],_id:""};

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    brand: new FormControl('')
  })

  constructor(private categoryService:CategoryService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.valid=false;
    this.getCategory();
  }
  exist(brand){
    return this.category.brands.filter(item=>item?.toUpperCase()==brand?.toUpperCase()).length>0;
  }

  addBrand(){
    if (!this.exist(this.form.value.brand) && this.form.value.brand!="") this.category.brands.push(this.form.value.brand);
  }

  removeBrand(item){
    console.log(item)
    this.category.brands=this.category.brands.filter(element=>element!=item);
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
        _id:this.category._id,
        name:this.form.value.name,
        brands:this.category.brands
      }
      this.categoryService.updateCategory(category).subscribe(data=>{
        Swal.fire({
          title: 'Catégorie modifiée',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.navigate('manageCategories');      })
    }
  }

  getCategory(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(this.id).subscribe(data=>{
      this.category=data;
    })
  }

  reset(){
    this.ngOnInit();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  
  brands;
  faTrash = faTrash
  valid;

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    brand: new FormControl('')
  })

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.valid=false;
    this.brands=["Samsung","Apple"]
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
  save(){
    this.valid=true;
    if (this.form.valid){
      this.valid=false;
      let category={
        name:this.form.value.name,
        brands:this.brands
      }
      this.categoryService.addCategory(category).subscribe(data=>{
        console.log(data)
      })
    }
  }

}

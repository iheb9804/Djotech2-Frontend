import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  categories;
  p;
  faTrash=faTrash;
  faEdit=faEdit;
  constructor(private router:Router,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  navigate(destination){
    this.router.navigate(['/'+destination]);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  updateCategory(category){
    this.router.navigate(['manageCategories/updateCategory/'+category._id]);
  }
  removeCategory(category){
    this.categoryService.deleteCategory(category._id).subscribe(data=>{
      this.getCategories();
    })
  }
}

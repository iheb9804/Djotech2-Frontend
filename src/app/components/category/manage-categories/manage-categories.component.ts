import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  categories;
  p;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
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

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  updateCategory(category) {
    this.navigate('manageCategories/updateCategory/' + category._id);
  }
  removeCategory(category) {
    Swal.fire({
      title: 'Supprimer la catégorie ' + category.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category._id).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: 'Catégorie supprimée',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCategories();
        })

      }
    })

  }
}

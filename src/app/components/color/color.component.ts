import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  color;
  colors;
  updatedColor={name:""};
  valid; 
  faTrash=faTrash;
  selectedColor;

  form = new FormGroup({
    color: new FormControl(''),
    updatedColor:new FormControl('')


  })
  constructor(private router:Router,private colorService:ColorService) { }

  ngOnInit(): void {
    //this.colors=[{name:"Redddsffdfds",_id:"1"},{name:"Black",_id:"2"},{name:"White",_id:"3"},{name:"red",_id:"4"}];
    this.getColors();
  }

  navigate(destination){
    this.router.navigate(['/'+destination]);
  }

  save(){
    console.log(this.colors);
      this.colorService.updateColors(this.colors).subscribe(data=>{
        console.log(data);
      })
  }

  selectColor(color){
    this.updatedColor=color;
    color.touched=true;
    this.selectedColor=color._id;
    
  }


  addColor(){
    let color={name:this.color};
    this.colorService.addColor(color).subscribe(data=>{
      this.colors.push(data);
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(data=>{
      this.colors=data;
    })
  }

  deleteColor(color){
    Swal.fire({
      title: 'Supprimer le couleur ' + color.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colorService.deleteColor(color._id).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Couleur supprimé',
            showConfirmButton: false,
            timer: 1500
          })
          this.updatedColor.name="";
          this.colors=this.colors.filter(item=>item._id!=color._id);
        })
      }
    })



    
  }
}

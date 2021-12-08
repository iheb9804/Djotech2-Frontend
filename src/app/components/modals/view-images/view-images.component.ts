import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVariable } from 'src/app/shared/global';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit {
  IMAGE_BASE_PATH = GlobalVariable.IMAGE_BASE_PATH;
  mainImage;
  @Input() product;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.mainImage = this.product.image[0];
  }
  selectImage(image) {
    this.mainImage = image;
  }
}

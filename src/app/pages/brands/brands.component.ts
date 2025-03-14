import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  selectedBrand: any = null;

  constructor(private brandsService : BrandsService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandsService.getBrands().subscribe({
      next: (res: { data: any[] }) => {
        this.brands = res.data;
      },
      error: (err: any) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  openModal(brand: any): void {
    this.selectedBrand = brand;
  }

  closeModal(): void {
    this.selectedBrand = null;
  }
}

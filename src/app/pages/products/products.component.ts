import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  products: WritableSignal<Iproduct[]> = signal([]);

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FeshCartr');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
    });
  }

  ngOnInit(): void {
    this.getProductsData();
  }
}

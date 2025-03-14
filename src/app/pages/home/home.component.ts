
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icartegory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { WelcomePipe } from '../../shared/pipes/welcome/welcome.pipe';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink  , SearchPipe , FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly  productsService= inject(ProductsService);
  products:WritableSignal<Iproduct[]> = signal([])


  private readonly categoriesSercice= inject(CategoriesService)
  categories:WritableSignal<Icartegory[]> = signal([])

  search:string =""

  private readonly cartService= inject(CartService)

  private readonly toastrService= inject(ToastrService)

  wishlist: WritableSignal<Iproduct[]> = signal([]);



  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res) => {
        console.log(res.data);
        this.products.set (res.data);
        console.log(this.products());

        },
    });
  }


  getCategoyrData(){
    this.categoriesSercice.getAllCategories().subscribe({
      next: (res)=>{
        this.categories.set(res.data)
      },
    })
  }


  ngOnInit(): void {
    this.getProductsData();
    this.getCategoyrData();
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['<i class="fa-solid fa-circle-left"></i>', '<i class="fa-solid fa-circle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }



  toggleWishlist(product: Iproduct, event: Event): void {
    event.stopPropagation();
    const currentList = this.wishlist();
    const index = currentList.findIndex(item => item._id === product._id);

    if (index > -1) {
      this.wishlist.set(currentList.filter(item => item._id !== product._id));
    } else {
      this.wishlist.set([...currentList, product]);
    }
  }

  isInWishlist(product: Iproduct): boolean {
    return this.wishlist().some(item => item._id === product._id);
  }



  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    rtl: true,
    dots: false,
    autoplayTimeout:4000,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message , 'FeshCartr' )
          this.cartService.cartNumber.set(res.numOfCartItems)
        }
    },
    })
  }
}

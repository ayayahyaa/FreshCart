import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activateRoute = inject (ActivatedRoute)
  private readonly productsService = inject (ProductsService)


  productId:any;
  productDetails :Iproduct = {} as Iproduct ;


  ngOnInit(): void {

  this.activateRoute.paramMap.subscribe({
    next:(res)=>{
      this.productId = res.get("id")
      console.log(this.productId);

      this.productsService.getSpecificProducts(this.productId).subscribe({
        next:(res)=>{
          this.productDetails = res.data ;
        },
        error:(err)=>{
          console.log(err);

        }
      })
    },
    error:()=>{
    }
  })

}

}

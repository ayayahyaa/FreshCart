import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Iorders } from '../../shared/interfaces/iorders';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  orders:Iorders[] = [];

  private readonly ordersService = inject(OrdersService)
  private readonly PLATFORM_ID = inject(PLATFORM_ID)


  ngOnInit():void {
    this.getOrders();
  }

  getOrders():void {
    if(isPlatformBrowser(this.PLATFORM_ID)){
      const userId = localStorage.getItem('userId') as string
      this.ordersService.getUserOrders(userId).subscribe({
        next:(res)=>{
          console.log(res);
          this.orders = res;
        },
      })
    }
  }

}

import { afterNextRender, AfterViewInit, Component, computed, inject, input, InputSignal, OnInit, Signal, } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { initFlowbite } from 'flowbite'


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLogin:InputSignal<boolean> = input<boolean>(true);

  private  readonly authService = inject (AuthService)

  private  readonly myTranslateService = inject (MyTranslateService)

  private readonly translateService = inject (TranslateService)

  private readonly cartService = inject (CartService)

  countCart:Signal<Number> = computed(  ()=>  this.cartService.cartNumber() )


  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)
      }
    })

    }

constructor() {
  afterNextRender(()=> {
    initFlowbite()
  })
}

  logout():void{
    this.authService.logoutUser()
  }

  change(lang:string):void{
    this.myTranslateService.changLangTranslate(lang);

  }
  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }

}

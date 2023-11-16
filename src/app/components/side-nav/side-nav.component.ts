import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCarRear, faCarSide, faCashRegister, faCopyright, faMoneyBill, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavRoutes } from 'src/app/interfaces/nav-routes';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  faBars =  faBars;
  faXmark =  faXmark;
  faCashRegister = faCashRegister;
  faUser = faUser;
  faMoneyBill = faMoneyBill;
  faCopyright = faCopyright;
  faCarRear = faCarRear;
  faCarSide = faCarSide

  linkRoutes: NavRoutes[]=[
    {
      icon:faCashRegister,
      link:"/seller",
      label: "Vendedor",
    },
    {
      icon: faUser,
      link: "/customer",
      label: "Cliente"
    },
    {
      icon: faMoneyBill,
      link: "/payment",
      label: "Pagamento"
    },
    {
      icon: faCopyright,
      link: "/brand",
      label: "Marca"
    },
    {
      icon: faCarRear,
      link: "/carModel",
      label: "Modelo"
    },
    {
      icon: faCarSide,
      link: "/car",
      label: "Carro"
    }
  ];
}

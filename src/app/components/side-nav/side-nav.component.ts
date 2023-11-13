import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCashRegister, faXmark } from '@fortawesome/free-solid-svg-icons';
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
    }
  ];
}

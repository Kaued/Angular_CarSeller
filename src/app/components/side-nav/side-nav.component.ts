import { Component } from '@angular/core';
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

  linkRoutes: NavRoutes[]=[
    {
      icon:faCashRegister,
      link:"/seller"
    }
  ];
}

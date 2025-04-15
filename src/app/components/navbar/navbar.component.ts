import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
    },
    {
      label: "Crea tu Pokemon",
      icon: "pi pi-plus",
    },
    {
      label: "Tus Pokemon",
      icon: "pi pi-heart",
    },
  ]
}

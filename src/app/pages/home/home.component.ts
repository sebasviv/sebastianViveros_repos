import { Component } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-home',
  imports: [
    DashboardComponent,
    NavbarComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}

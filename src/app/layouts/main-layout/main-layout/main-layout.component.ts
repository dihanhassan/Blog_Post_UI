import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar/side-bar.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HomeComponent,SideBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}

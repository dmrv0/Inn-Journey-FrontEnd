import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ChangePassComponent } from '../chance-pass/chance-pass.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router){}

  ngOnInit() {
      this.items = [
          { label: 'Dashboard', icon: 'pi pi-home', component: ChangePassComponent },
          { label: 'Transactions', icon: 'pi pi-chart-line' },
          { label: 'Products', icon: 'pi pi-list' },
          { label: 'Messages', icon: 'pi pi-inbox' }
      ]
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

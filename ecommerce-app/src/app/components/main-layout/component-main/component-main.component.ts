import { Component } from '@angular/core';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-component-main',
  templateUrl: './component-main.component.html',
  styleUrls: ['./component-main.component.css']
})
export class ComponentMainComponent {
  sections: Section[] = [
    { name: 'Productos', route: 'productos', description: 'Gestiona tu catálogo de productos', icon: 'inventory_2' },
    { name: 'Inventarios', route: 'inventarios', description: 'Controla el stock de tus productos', icon: 'list_alt' },
    { name: 'Órdenes', route: 'ordenes', description: 'Administra los pedidos de tus clientes', icon: 'shopping_cart' },
    { name: 'Perfil', route: 'perfil', description: 'Configura tu información personal', icon: 'account_circle' }
  ];


}

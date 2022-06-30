import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'cookbook';
  route: string = 'recipes';

  onNavigate(route: string) {
    this.route = route;
  }
}

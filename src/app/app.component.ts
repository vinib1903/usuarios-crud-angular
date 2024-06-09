import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosComponent } from "./usuarios/usuarios.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, UsuariosComponent]
})
export class AppComponent {
  title = 'UsuariosApp';
}

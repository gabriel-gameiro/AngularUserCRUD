import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { DetalheUsuarioComponent } from './components/detalhe-usuario/detalhe-usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
    { path: 'usuarios', component: ListaUsuariosComponent },
    { path: 'usuario/:id', component: DetalheUsuarioComponent },
];

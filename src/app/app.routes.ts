import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth/auth.guard';

const appTitle = "WebSnapApp";

export const routes: Routes = [
  {
    path: "",
    title: `Accueil - ${appTitle}`,
    pathMatch: "full",
    loadComponent: () => import("@/components/landing-page/landing-page.component").then(m => m.LandingPageComponent)
  },
  {
    path: "personnages",
    title: `Liste des personnages - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/character-list/character-list.component").then(m => m.CharacterListComponent)
  },
  {
    path: "auth",
    loadChildren: () => import("./routes/auth.routes").then(m => m.authRoutes)
  },
  {
    path: "erreur/404",
    title: `Erreur 404 - ${appTitle}`,
    loadComponent: () => import("@/components/error/error.component").then(m => m.ErrorComponent)
  },
  {
    path: "**",
    redirectTo: "erreur/404"
  }
];

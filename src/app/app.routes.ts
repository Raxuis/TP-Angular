import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth/auth.guard';

const appTitle = "TP-Angular";

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
  // TODO: personnage/:id
  {
    path: "personnages/:id",
    title: `Détails du personnage - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/character/character.component").then(m => m.CharacterComponent)
  },
  {
    path: "nasa",
    title: `Nasa - ${appTitle}`,
    canActivate: [AuthGuard],
    loadComponent: () => import("@/components/nasa/nasa.component").then(m => m.NasaComponent)
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

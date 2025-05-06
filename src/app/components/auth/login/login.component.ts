import {AuthService} from '@/services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  isSubmitted: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        "",
        Validators.required
      ],
      password: [
        "",
        Validators.required
      ]
    });
  }

  onSubmit(): void {
    this.isSubmitted.set(true);

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      console.log("Formulaire invalide, soumission bloquée !");
      return;
    }

    const {username, password} = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      {
        error: (err) => {
          console.error("Login error :", err);
          this.toastrService.error("Une erreur est survenue lors de la connexion.", "Erreur");
        },
        next: () => {
          this.toastrService.success("Connexion réussie !", "Succès");
          this.loginForm.reset();
        }
      }
    );
  }
}

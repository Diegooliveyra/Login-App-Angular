import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = this.fb.group(
    {
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mobilephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.matchingPassword }
  );

  states = ['SP', 'RJ', 'MG', 'SC', 'GO', 'PR', 'MT'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  matchingPassword(group: FormGroup) {
    if (group) {
      const password1 = group.get('password1')?.value;
      const password2 = group.get('password2')?.value;
      if (password1 === password2) {
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit() {
    let user: User = {
      ...this.formRegister.value,
      password: this.formRegister.get('password1')?.value,
    };
    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['auth/login']);
      },
      (error) => {
        throwError(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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

  onSubmit() {}
}

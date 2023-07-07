import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  image: string = '/assets/images/20200703_151708.jpg';
  @ViewChild('myModal') modal!: ElementRef;

  name: string = '';
  email: string = '';
  message: string = '';
  isLoading: boolean = false;

  form: FormGroup = this.formBuilder.group({
    from_name: '',
    to_name: 'Mbuelo',
    from_email: '',
    subject: '',
    message: ''
  });

  async send() {
    if (this.form) {
      this.isLoading = true;
      emailjs.init(environment.emailjsApiKey);
      try {
        await emailjs.send(environment.emailjsServiceId, environment.emailjsTemplateId, {
          from_name: this.form.value.from_name,
          to_name: this.form.value.to_name,
          from_email: this.form.value.from_email,
          subject: this.form.value.subject,
          message: this.form.value.message,
        });
        this.form.reset();
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  openModal(): void {
    this.modal.nativeElement.classList.remove('hidden');
  }

  closeModal(): void {
    this.modal.nativeElement.classList.add('hidden');
  }

  constructor(private formBuilder: FormBuilder){

  }
}

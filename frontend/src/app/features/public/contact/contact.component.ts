import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../../../core/services/inquiry.service';
import { CreateInquiry } from '../../../shared/models/inquiry.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',

})
export class ContactComponent implements OnInit {
  submitted = signal(false);
  submitting = signal(false);
  contactForm!: FormGroup;

  constructor(
    private inquiryService: InquiryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {

  this.contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    productId: [null]
  });

  this.route.queryParams.subscribe(params => {
    if (params['product']) {
      this.contactForm.patchValue({
        productId: +params['product'],
        subject: 'Product Inquiry'
      });
    }
  });
}

  onSubmit(): void {

  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  this.submitting.set(true);

  const inquiry: CreateInquiry = this.contactForm.value;

  this.inquiryService.createInquiry(inquiry).subscribe({
    next: () => {
      this.submitted.set(true);
      this.submitting.set(false);
    },
    error: () => {
      this.submitting.set(false);
    }
  });
}

  resetForm(): void {

  this.contactForm.reset({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productId: null
  });

  this.submitted.set(false);
}

}

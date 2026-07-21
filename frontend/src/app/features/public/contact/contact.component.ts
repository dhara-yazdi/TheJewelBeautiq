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
      productId: [null],
      productName: ['']
    });

    this.route.queryParams.subscribe(params => {

      const productId = params['productId'];
      const productName = params['productName'];

      if (productId) {

        this.contactForm.patchValue({

          productId: +productId,

          productName: productName,

          subject: 'Product Inquiry',

          message:
            `Hello,

             I am interested in this jewellery piece and would appreciate more information.

             Could you please share its availability and any additional details, including customization options, certification, and pricing?

             Thank you.`

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
      productId: null,
      productName: ''
    });

    this.submitted.set(false);
  }

}

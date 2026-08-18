import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css'
})
export class WhatsappButtonComponent {
whatsappUrl =
    'https://wa.me/971588486935?text=' +
    encodeURIComponent(
      [
        'Hello,',
        '',
        'I would like to know more about your diamond jewellery collection.',
        '',
        'Thank you.'
      ].join('\n')
    );
}

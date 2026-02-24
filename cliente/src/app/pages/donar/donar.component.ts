import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donar.component.html',
  styleUrl: './donar.component.scss'
})
export class DonarComponent {
  activePaymentMethod: 'card' | 'paypal' | 'bank' | null = null;
  
  cardData = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    amount: ''
  };

  bankData = {
    banco: 'BBVA',
    cuenta: '#1154310608',
    tarjeta: '4152313824353176',
    clabe: '012691911543106080',
    beneficiario: 'Riviera Rescue A.C.',
    referencia: 'DON' + Math.floor(Math.random() * 1000000)
  };

  constructor(private router: Router) {}

  showPaymentMethod(method: 'card' | 'paypal' | 'bank') {
    this.activePaymentMethod = method;
  }

  cancelPayment() {
    this.activePaymentMethod = null;
    this.cardData = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
      amount: ''
    };
  }

  processCardPayment() {
    // Aquí iría la lógica de procesamiento real
    alert('¡Gracias por tu donación! Procesando pago con tarjeta...');
    this.cancelPayment();
  }

  processPaypalPayment() {
    // Aquí iría la integración real con PayPal
    window.open('https://www.paypal.com', '_blank');
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('¡Copiado al portapapeles!');
    });
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})

export class FaqComponent {
  faqs = [
    {
      id: 1,
      question: '¿Cuál es el proceso de adopción?',
      answer: 'El proceso de adopción comienza con la selección de una mascota de nuestro catálogo. Luego, deberás llenar un formulario de solicitud donde evaluamos la compatibilidad y el ambiente del hogar. Una vez aprobada la solicitud, programamos una visita para que conozcas a tu futura mascota. Finalmente, se firma el contrato de adopción y se realiza un seguimiento posterior.',
      isOpen: false
    },
    {
      id: 2,
      question: '¿Qué incluye la adopción?',
      answer: 'Todas nuestras mascotas en adopción incluyen: vacunas al día, desparasitación, esterilización (o compromiso de esterilización cuando tengan la edad adecuada) y una revisión veterinaria inicial. También proporcionamos asesoramiento post-adopción para asegurar una transición exitosa.',
      isOpen: false
    },
    {
      id: 3,
      question: '¿Cómo puedo ayudar si no puedo adoptar?',
      answer: 'Hay muchas formas de ayudar: puedes ser hogar temporal, hacer donaciones (monetarias o en especie), ser voluntario en nuestras instalaciones, compartir nuestras publicaciones en redes sociales, o participar en nuestros eventos de recaudación. Cada granito de arena cuenta para nuestra causa.',
      isOpen: false
    },
    {
      id: 4,
      question: '¿Qué hago si encuentro un animal abandonado?',
      answer: 'Si encuentras un animal abandonado, primero asegúrate de que realmente esté abandonado y no sea un animal perdido. Toma fotos y compártelas en grupos locales. Si confirmas que está abandonado, contacta con nosotros para evaluar la situación. Mientras tanto, si puedes, proporciona agua, comida y un lugar seguro temporal.',
      isOpen: false
    },
    {
      id: 5,
      question: '¿Realizan seguimiento después de la adopción?',
      answer: 'Sí, realizamos seguimiento post-adopción para asegurar el bienestar de nuestras mascotas. Hacemos visitas programadas durante los primeros meses y mantenemos comunicación constante con las familias adoptivas. Nuestro objetivo es asegurar una adaptación exitosa tanto para la mascota como para la familia.',
      isOpen: false
    }
  ];

  toggleFaq(faq: any) {
    faq.isOpen = !faq.isOpen;
  }
}
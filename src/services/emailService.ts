
import emailjs from 'emailjs-com';

// As chaves públicas do EmailJS são seguras para usar no frontend
const SERVICE_ID = "service_sw2qy8f";
const TEMPLATE_ID = "template_2uupoje";
const USER_ID = "qK7k9JDRJuybvP9pW";
const ADMIN_EMAIL = "gmateusm2020@gmail.com";

interface EmailParams {
  toName: string;
  fromName: string;
  giftName: string;
  message?: string;
  allReservations?: string;
}

export const sendReservationEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const templateParams = {
      to_name: params.toName,
      from_name: params.fromName,
      gift_name: params.giftName,
      message: params.message || '',
      all_reservations: params.allReservations || '',
      to_email: ADMIN_EMAIL, // Adicionando o email do administrador
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
    console.log('Email enviado com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

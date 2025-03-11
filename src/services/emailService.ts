
import emailjs from 'emailjs-com';

// As chaves públicas do EmailJS são seguras para usar no frontend
const SERVICE_ID = "service_sw2qy8f";
const TEMPLATE_ID = "template_2uupoje";
const USER_ID = "qK7k9JDRJuybvP9pW";
const ADMIN_EMAIL = "vida110718@gmail.com";

interface EmailParams {
  toName: string;
  fromName: string;
  giftName: string;
  message?: string;
  allReservations?: string;
  gitHubUpdateInstructions?: string;
}

export const sendReservationEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // Certifica-se de que o conteúdo do GitHub está formatado adequadamente para o e-mail
    // Adiciona espaços extras e formatação para melhorar a legibilidade no email
    const formattedGitHubInstructions = params.gitHubUpdateInstructions 
      ? params.gitHubUpdateInstructions
          .replace(/\n/g, '<br>')
          .replace(/(const giftReservations =)/g, '<strong>$1</strong>')
          .replace(/(INSTRUÇÕES:)/g, '<strong>$1</strong>')
      : '';

    const templateParams = {
      to_name: params.toName,
      from_name: params.fromName,
      gift_name: params.giftName,
      message: params.message || '',
      all_reservations: params.allReservations ? params.allReservations.replace(/\n/g, '<br>') : '',
      github_update_instructions: formattedGitHubInstructions,
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

export const generateReservationsCode = (reservations: Record<number, string>): string => {
  return `// Atualize este código em seu repositório

// Reservas atualizadas
const giftReservations = ${JSON.stringify(reservations, null, 2)};

/*
INSTRUÇÕES:
1. Crie ou atualize o arquivo reservations.json no seu repositório GitHub
2. Cole o conteúdo de 'giftReservations' acima (sem as aspas)
3. Commit e push das alterações para atualizar o site
*/
`;
};


import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Gift, GiftReservation } from "@/types/gift";
import { sendReservationEmail, generateReservationsCode } from "@/services/emailService";

interface GiftCardProps {
  gift: Gift;
  onReserve: (giftId: number, name: string) => void;
  isReserved: boolean;
  reservedBy?: string;
  allReservations?: GiftReservation;
}

export const GiftCard = ({ 
  gift, 
  onReserve, 
  isReserved, 
  reservedBy,
  allReservations = {}
}: GiftCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { toast } = useToast();

  const handleReserve = async () => {
    const name = prompt("Por favor, digite seu nome para reservar este presente:");
    if (name && name.trim().length >= 3) {
      setIsSending(true);
      
      // Reservar o presente
      onReserve(gift.id, name.trim());
      
      // Preparar lista completa de reservas para o email
      const updatedReservations = {
        ...allReservations,
        [gift.id]: name.trim()
      };
      
      // Formatar as reservas para o email
      const reservationsText = Object.entries(updatedReservations)
        .map(([giftId, reserverName]) => `ID ${giftId}: Reservado por ${reserverName}`)
        .join('\n');

      // Gerar código de atualização para GitHub
      const gitHubUpdateText = generateReservationsCode(updatedReservations);

      // Enviar email de notificação
      try {
        const emailSent = await sendReservationEmail({
          toName: "Daniel", // Nome de quem receberá o email
          fromName: name.trim(),
          giftName: gift.name,
          message: `O presente "${gift.name}" foi reservado por ${name.trim()}. Você receberá esta notificação em gmateusm2020@gmail.com`,
          allReservations: reservationsText,
          gitHubUpdateInstructions: gitHubUpdateText
        });
        
        if (emailSent) {
          toast({
            title: "Presente Reservado!",
            description: "Reserva realizada e notificação enviada com sucesso.",
          });
        } else {
          throw new Error("Falha ao enviar email");
        }
      } catch (error) {
        console.error("Erro ao enviar email:", error);
        toast({
          title: "Presente Reservado!",
          description: "Sua reserva foi realizada, mas houve um problema ao enviar a notificação.",
        });
      } finally {
        setIsSending(false);
      }
    } else if (name !== null) {
      toast({
        title: "Nome Inválido",
        description: "Por favor, digite um nome com pelo menos 3 caracteres.",
        variant: "destructive",
      });
    }
  };

  // Properly handle image URLs with better error management
  let imageUrl = gift.imageUrl;
  
  // Better handling for image URLs
  // We'll treat all URLs as they are without modifying them
  // This allows both full URLs and relative paths to work correctly
  console.log(`Processing image for ${gift.name}: ${imageUrl}`);

  return (
    <div
      className="relative group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl animate-fade-up border-2 border-transparent hover:border-gold/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de brilho nos cantos */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative overflow-hidden aspect-square">
        {!imgError ? (
          <img
            src={imageUrl}
            alt={gift.name}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => {
              console.error(`Erro ao carregar imagem: ${imageUrl} para o presente: ${gift.name}`);
              setImgError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src="/placeholder.svg"
                alt="Imagem indisponível"
                className="w-16 h-16 opacity-50 mb-2"
              />
              <p className="text-sm text-gray-500 text-center">{gift.name}</p>
            </div>
          </div>
        )}
        {/* Overlay dourado sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-6 relative">
        {/* Decoração superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <h3 className="font-playfair text-xl mb-4 text-gray-800">{gift.name}</h3>
        
        {isReserved ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Reservado por {reservedBy}</p>
            <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        ) : (
          <Button
            onClick={handleReserve}
            disabled={isSending}
            className="w-full bg-gold hover:bg-gold-dark text-gray-900 font-medium transition-all duration-300 
                     shadow-[0_0_10px_rgba(255,215,0,0.3)] hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]
                     border border-gold/20 hover:border-gold/40"
          >
            {isSending ? "Processando..." : "Reservar Presente"}
          </Button>
        )}
        
        {/* Decoração inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    </div>
  );
};

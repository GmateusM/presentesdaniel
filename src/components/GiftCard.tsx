
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Gift } from "@/types/gift";

interface GiftCardProps {
  gift: Gift;
  onReserve: (giftId: number, name: string) => void;
  isReserved: boolean;
  reservedBy?: string;
}

export const GiftCard = ({ gift, onReserve, isReserved, reservedBy }: GiftCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleReserve = () => {
    const name = prompt("Por favor, digite seu nome para reservar este presente:");
    if (name && name.trim().length >= 3) {
      onReserve(gift.id, name.trim());
      toast({
        title: "Presente Reservado!",
        description: "Obrigado pela sua reserva.",
      });
    } else if (name !== null) {
      toast({
        title: "Nome Inválido",
        description: "Por favor, digite um nome com pelo menos 3 caracteres.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-xl mb-4 text-gray-800">{gift.name}</h3>
        {isReserved ? (
          <p className="text-sm text-gray-500 mb-4">Reservado por {reservedBy}</p>
        ) : (
          <Button
            onClick={handleReserve}
            className="w-full bg-navy hover:bg-navy-light transition-colors"
          >
            Reservar Presente
          </Button>
        )}
      </div>
    </div>
  );
};


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
    const name = prompt("Please enter your name to reserve this gift:");
    if (name && name.trim().length >= 3) {
      onReserve(gift.id, name.trim());
      toast({
        title: "Gift Reserved!",
        description: "Thank you for your reservation.",
      });
    } else if (name !== null) {
      toast({
        title: "Invalid Name",
        description: "Please enter a name with at least 3 characters.",
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
          <p className="text-sm text-gray-500 mb-4">Reserved by {reservedBy}</p>
        ) : (
          <Button
            onClick={handleReserve}
            className="w-full bg-navy hover:bg-navy-light transition-colors"
          >
            Reserve Gift
          </Button>
        )}
      </div>
    </div>
  );
};

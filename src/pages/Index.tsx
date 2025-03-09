import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";

// Lista de presentes (apenas os novos itens)
const initialGifts: Gift[] = [
  { id: 1, name: "Conjunto de refratários de vidro", imageUrl: "public/lovable-uploads/0bb05816-9eb4-4468-b1f9-e85d8b48267b.png" },
  { id: 2, name: "Conjunto de azeiteiro e vinagreiro", imageUrl: "public/lovable-uploads/7f9d1bec-bc10-44aa-b116-bbe6988166be.png" },
  { id: 3, name: "Tábua de corte de bambu", imageUrl: "public/lovable-uploads/6d82db39-2656-4443-b5a6-59a48f10168d.png" },
  { id: 4, name: "Frigideira antiaderente vermelha", imageUrl: "public/lovable-uploads/046e7e1e-a566-4757-8606-1a72f00cd19c.png" },
  { id: 5, name: "Assadeira de vidro retangular", imageUrl: "public/lovable-uploads/e3134c31-8df3-41d5-bc97-33fa123ee74f.png" },
  { id: 6, name: "Moedor de pimenta em madeira", imageUrl: "public/lovable-uploads/18226053-a8df-4fa7-8180-6fe6af095052.png" },
  { id: 7, name: "Conjunto de panelas turquesa (5 peças)", imageUrl: "public/lovable-uploads/1b979276-c6d3-4a53-b16a-75dd80751ca6.png" },
  { id: 8, name: "Panela de pressão azul", imageUrl: "public/lovable-uploads/510a9abe-9419-4062-9636-326620582f8c.png" },
  { id: 9, name: "Liquidificador azul", imageUrl: "public/lovable-uploads/a22436c0-bf91-44a3-9d43-bbccb9ed54d6.png" },
  { id: 10, name: "Tábua de passar roupa", imageUrl: "public/lovable-uploads/08086239-fa91-4c05-a225-593b708e6660.png" },
  { id: 11, name: "Escada doméstica (5 degraus)", imageUrl: "public/lovable-uploads/efcd1e9a-9bd3-455c-bc7e-8cd31b023649.png" }
];

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [nextId, setNextId] = useState(12); // Atualizado para começar após o último ID

  // Carregar presentes e reservas do localStorage
  useEffect(() => {
    const savedGifts = localStorage.getItem("gifts");
    const savedReservations = localStorage.getItem("giftReservations");
    
    if (savedGifts) {
      setGifts(JSON.parse(savedGifts));
      
      // Encontrar o maior ID para definir o próximo ID
      const parsedGifts = JSON.parse(savedGifts) as Gift[];
      const maxId = Math.max(...parsedGifts.map(gift => gift.id), 0);
      setNextId(maxId + 1);
    } else {
      setGifts(initialGifts);
    }
    
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  // Salvar presentes no localStorage sempre que mudar
  useEffect(() => {
    if (gifts.length > 0) {
      localStorage.setItem("gifts", JSON.stringify(gifts));
    }
  }, [gifts]);

  const handleReserve = (giftId: number, name: string) => {
    const newReservations = { ...reservations, [giftId]: name };
    setReservations(newReservations);
    localStorage.setItem("giftReservations", JSON.stringify(newReservations));
  };

  const handleRemoveReservation = (giftId: number) => {
    const newReservations = { ...reservations };
    delete newReservations[giftId];
    setReservations(newReservations);
    localStorage.setItem("giftReservations", JSON.stringify(newReservations));
  };

  const handleAddGift = (gift: Omit<Gift, "id">) => {
    const newGift = {
      ...gift,
      id: nextId
    };
    
    setGifts([...gifts, newGift]);
    setNextId(nextId + 1);
  };

  const handleRemoveGift = (giftId: number) => {
    setGifts(gifts.filter(gift => gift.id !== giftId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative py-20 px-6 bg-gradient-to-r from-navy to-navy-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdS11cYT-aVigTc7F_PAQOfb02UgIlCcRnWg&usqp=CAU')] opacity-10" />
        <div className="relative container max-w-4xl mx-auto text-center">
          <h1 className="font-greatvibes text-7xl md:text-8xl mb-8 animate-fade-up tracking-wide">
            Lista de Presentes
          </h1>
          <div className="w-32 h-1 bg-gold mx-auto mb-8 animate-fade-up"></div>
          <p className="text-xl md:text-2xl text-white/80 animate-fade-up mb-6 font-playfair italic">
            Estamos muito felizes em compartilhar este momento especial com vocês! Preparamos uma lista de presentes para nos ajudar a começar essa nova fase da nossa vida juntos. Agradecemos pelo carinho e generosidade de todos!
          </p>
          <p className="text-xl md:text-2xl text-white/80 animate-fade-up font-playfair italic">
            Escolha o presente perfeito para celebrar este momento especial!
          </p>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onReserve={handleReserve}
              isReserved={!!reservations[gift.id]}
              reservedBy={reservations[gift.id]}
              allReservations={reservations}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-navy hover:text-navy-light"
          >
            {showAdmin ? "Ocultar Painel Admin" : "Mostrar Painel Admin"}
          </Button>
        </div>

        {showAdmin && (
          <AdminPanel
            gifts={gifts}
            reservations={reservations}
            onRemoveReservation={handleRemoveReservation}
            onAddGift={handleAddGift}
            onRemoveGift={handleRemoveGift}
          />
        )}
      </main>

      <footer className="relative py-16 px-6 bg-gradient-to-r from-navy to-navy-light text-white overflow-hidden mt-12">
        <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdS11cYT-aVigTc7F_PAQOfb02UgIlCcRnWg&usqp=CAU')] opacity-10" />
        <div className="relative container max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl text-white/90 font-playfair italic animate-fade-up">
            Agradecemos imensamente por fazer parte da nossa história
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

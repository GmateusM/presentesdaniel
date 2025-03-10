import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";

// Lista inicial de presentes - Todos com caminhos de imagem corretos
const initialGifts: Gift[] = [
  { id: 1, name: "Conjunto de refratários de vidro", imageUrl: "/lovable-uploads/4416c757-818c-48f3-94aa-5de3a83f2de8.png" },
  { id: 2, name: "Conjunto de azeiteiro e vinagreiro", imageUrl: "/lovable-uploads/6d414486-e76e-45bb-aaea-faa4038f5187.png" },
  { id: 3, name: "Tábua de corte de bambu", imageUrl: "/lovable-uploads/fcabaf3a-2ad0-4059-a5f6-4d5f2d9aa358.png" },
  { id: 4, name: "Frigideira antiaderente vermelha", imageUrl: "/lovable-uploads/3243b04b-fc48-4b20-ab6b-90e610b3ca31.png" },
  { id: 5, name: "Assadeira de aço inox", imageUrl: "/lovable-uploads/c76a637a-a178-469b-86a6-a4aa2b1da7c3.png" },
  { id: 6, name: "Moedor de pimenta em madeira", imageUrl: "/lovable-uploads/eb0dbf78-f524-406d-9d93-4abe6ea71f73.png" },
  { id: 7, name: "Conjunto de panelas turquesa (5 peças)", imageUrl: "/lovable-uploads/2c67115a-3c3c-4c6e-854d-5f4e6740c1b8.png" },
  { id: 8, name: "Panela de pressão azul", imageUrl: "/lovable-uploads/81afd045-5428-480a-8e48-bdeb7843d7cd.png" },
  { id: 9, name: "Liquidificador azul", imageUrl: "/lovable-uploads/7a07de81-0de5-4705-b4a2-c6028987c631.png" },
  { id: 10, name: "Tábua de passar roupa", imageUrl: "/lovable-uploads/1c5209b2-7819-4d7c-a009-f4da7f934936.png" },
  { id: 11, name: "Escada doméstica (5 degraus)", imageUrl: "/lovable-uploads/b20991ac-8a99-46cf-a5ae-4d01378f2b34.png" }
];

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [nextId, setNextId] = useState(12); // Próximo ID após o último item (11)
  const [loading, setLoading] = useState(true);

  // Carregar presentes e reservas do localStorage
  useEffect(() => {
    try {
      const savedGifts = localStorage.getItem("gifts");
      const savedReservations = localStorage.getItem("giftReservations");
      
      if (savedGifts) {
        const parsedGifts = JSON.parse(savedGifts) as Gift[];
        console.log("Loaded gifts from localStorage:", parsedGifts);
        setGifts(parsedGifts);
        
        // Encontrar o maior ID para definir o próximo ID
        const maxId = Math.max(...parsedGifts.map(gift => gift.id), 0);
        setNextId(maxId + 1);
      } else {
        console.log("No saved gifts found, using initial gifts");
        setGifts(initialGifts);
        // Salvar os presentes iniciais no localStorage
        localStorage.setItem("gifts", JSON.stringify(initialGifts));
      }
      
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Em caso de erro, usar a lista inicial
      setGifts(initialGifts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Console log to check the loaded gifts
  useEffect(() => {
    console.log("Gifts after loading:", gifts);
  }, [gifts]);

  // Salvar presentes no localStorage sempre que mudar
  useEffect(() => {
    if (gifts.length > 0) {
      localStorage.setItem("gifts", JSON.stringify(gifts));
      console.log("Gifts saved to localStorage:", gifts);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando presentes...</p>
      </div>
    );
  }

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
          {gifts.length > 0 ? (
            gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onReserve={handleReserve}
                isReserved={!!reservations[gift.id]}
                reservedBy={reservations[gift.id]}
                allReservations={reservations}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-lg text-gray-500 py-8">
              Nenhum presente disponível no momento.
            </p>
          )}
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

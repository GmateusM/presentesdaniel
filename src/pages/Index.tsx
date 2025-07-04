
import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const initialGifts: Gift[] = [
 
  { id: 1, name: "Panela de pressão", imageUrl: "/lovable-uploads/429ae40c-5ef0-405c-8a03-11e17efe3987.png" },
  { id: 2, name: "Escada doméstica (5 degraus)", imageUrl: "/lovable-uploads/da98d2d7-d725-4564-8f82-e5646e7d9d16.png" },
  { id: 3, name: "Multiprocessador", imageUrl: "https://a-static.mlcdn.com.br/800x560/multiprocessador-philco-pmp1600-2-velocidades-pulsar-1400w/lojasbenoit/97707/efea45ea425cc45e916164a4cad8b9e2.jpeg" },
  { id: 4, name: "Jogo de taças para sobremesa", imageUrl: "https://a-static.mlcdn.com.br/800x560/jogo-de-tacas-de-sobremesa-de-vidro-160ml-6-pecas-haus-concept-gelato/magazineluiza/237309900/24513a2ed82332ca77b4e6007605ef4c.jpg" },
  { id: 5, name: "Jogo de taças", imageUrl: "https://a-static.mlcdn.com.br/1500x1500/jogo-de-tacas-de-vidro-240ml-6-pecas-casambiente-diamond-azul-tcvi059/globaleletro/4045p/28e20455a0a8745af5222a35187f8b48.jpg" },
  { id: 6, name: "Aspirador de pó", imageUrl: "https://a-static.mlcdn.com.br/800x560/aspirador-de-po-e-agua-electrolux-1400w-a10n1/magazineluiza/085865400/23ac2911d421162441347374593d895d.jpg" },
  { id: 7, name: "Ventilador de pé", imageUrl: "https://imgs.pontofrio.com.br/55007291/1xg.jpg" },
  { id: 8, name: "máquina de lavar roupa 15kg", imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_941727-MLU77374826535_072024-F.webp" }

];

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [nextId, setNextId] = useState(12);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const resetStorage = () => {
      localStorage.removeItem("gifts");
      console.log("Resetando lista de presentes para os valores iniciais");
      localStorage.setItem("gifts", JSON.stringify(initialGifts));
      setGifts(initialGifts);
    };
    resetStorage();
  }, []);

  useEffect(() => {
    try {
      const savedGifts = localStorage.getItem("gifts");
      const savedReservations = localStorage.getItem("giftReservations");
      
      if (savedGifts) {
        const parsedGifts = JSON.parse(savedGifts) as Gift[];
        console.log("Loaded gifts from localStorage:", parsedGifts);
        const validatedGifts = parsedGifts.map(gift => ({
          ...gift,
          imageUrl: gift.imageUrl
        }));
        setGifts(validatedGifts);
        const maxId = Math.max(...validatedGifts.map(gift => gift.id), 0);
        setNextId(maxId + 1);
      } else {
        console.log("No saved gifts found, using initial gifts");
        setGifts(initialGifts);
        localStorage.setItem("gifts", JSON.stringify(initialGifts));
      }
      
      if (savedReservations) {
        setReservations(JSON.parse(savedReservations));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setGifts(initialGifts);
      localStorage.setItem("gifts", JSON.stringify(initialGifts));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Gifts after loading:", gifts);
  }, [gifts]);

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
    let imageUrl = gift.imageUrl;
    
    const newGift = {
      ...gift,
      imageUrl,
      id: nextId
    };
    
    console.log("Adding new gift:", newGift);
    const updatedGifts = [...gifts, newGift];
    setGifts(updatedGifts);
    setNextId(nextId + 1);
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
  };

  const handleRemoveGift = (giftId: number) => {
    const updatedGifts = gifts.filter(gift => gift.id !== giftId);
    setGifts(updatedGifts);
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
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
        <div className="w-full max-w-4xl mx-auto mb-10 relative overflow-hidden">
          <p className="text-center text-black italic py-3 px-6 bg-white rounded-md border-2 border-black font-playfair">
            Imagens meramente ilustrativas.
          </p>
        </div>
        
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

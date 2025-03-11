
import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";

// Lista atualizada de presentes com as 11 imagens enviadas
const initialGifts: Gift[] = [
  { id: 1, name: "Conjunto de refratários de vidro", imageUrl: "/lovable-uploads/3ce2b63f-df21-418e-912f-c567a7b4aa78.png" },
  { id: 2, name: "Conjunto de azeiteiro e vinagreiro", imageUrl: "/lovable-uploads/79a54b10-bd69-4c92-a1b5-4027da07fb98.png" },
  { id: 3, name: "Tábua de corte de bambu", imageUrl: "/lovable-uploads/5a6c50ef-431b-4f42-901b-66d398b0666f.png" },
  { id: 4, name: "Frigideira antiaderente vermelha", imageUrl: "/lovable-uploads/6ba2dd70-a3ee-400f-a1f4-c95ccc8ebe5a.png" },
  { id: 5, name: "Assadeira de aço inox", imageUrl: "/lovable-uploads/3ce2b63f-df21-418e-912f-c567a7b4aa78.png" },
  { id: 6, name: "Moedor de pimenta em madeira", imageUrl: "/lovable-uploads/ff9cce77-a0a3-41b8-8eec-08bfb00c2a18.png" },
  { id: 7, name: "Conjunto de panelas turquesa (5 peças)", imageUrl: "/lovable-uploads/75451daa-c1e3-45f7-8461-f574ca33783d.png" },
  { id: 8, name: "Panela de pressão azul", imageUrl: "/lovable-uploads/9e663e06-9479-4740-9f5d-29a5c582bfcc.png" },
  { id: 9, name: "Liquidificador azul", imageUrl: "/lovable-uploads/177a8b25-4f79-493b-a275-94d0f2da0934.png" },
  { id: 10, name: "Tábua de passar roupa", imageUrl: "/lovable-uploads/5059c10b-fad9-4c46-af3a-b64f3f0cc978.png" },
  { id: 11, name: "Escada doméstica (5 degraus)", imageUrl: "/lovable-uploads/ea8717bf-6598-418a-bd50-25c10f2b6157.png" }
];

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [nextId, setNextId] = useState(12); // Próximo ID após o último item (11)
  const [loading, setLoading] = useState(true);

  // Resetar o localStorage para garantir que os dados iniciais sejam carregados
  useEffect(() => {
    const resetStorage = () => {
      // Verificar se já existe um registro no localStorage
      const savedGifts = localStorage.getItem("gifts");
      
      // Se não existir ou se tiver problemas, redefinir
      if (!savedGifts || JSON.parse(savedGifts).length === 0) {
        console.log("Resetando lista de presentes para os valores iniciais");
        localStorage.setItem("gifts", JSON.stringify(initialGifts));
        setGifts(initialGifts);
      }
    };
    
    resetStorage();
  }, []);

  // Carregar presentes e reservas do localStorage
  useEffect(() => {
    try {
      const savedGifts = localStorage.getItem("gifts");
      const savedReservations = localStorage.getItem("giftReservations");
      
      if (savedGifts) {
        const parsedGifts = JSON.parse(savedGifts) as Gift[];
        console.log("Loaded gifts from localStorage:", parsedGifts);
        
        // Garantir que todos os presentes tenham URLs de imagens válidas
        const validatedGifts = parsedGifts.map(gift => ({
          ...gift,
          // Verificar o formato da URL da imagem
          imageUrl: gift.imageUrl
        }));
        
        setGifts(validatedGifts);
        
        // Encontrar o maior ID para definir o próximo ID
        const maxId = Math.max(...validatedGifts.map(gift => gift.id), 0);
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
      // E salvar a lista inicial no localStorage
      localStorage.setItem("gifts", JSON.stringify(initialGifts));
    } finally {
      setLoading(false);
    }
  }, []);

  // Console log para verificar os presentes carregados
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
    // Garantir que a URL da imagem está correta
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
    
    // Salvar imediatamente no localStorage
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
  };

  const handleRemoveGift = (giftId: number) => {
    const updatedGifts = gifts.filter(gift => gift.id !== giftId);
    setGifts(updatedGifts);
    
    // Salvar imediatamente no localStorage
    localStorage.setItem("gifts", JSON.stringify(updatedGifts));
  };

  // Botão para limpar o localStorage completamente e restaurar os valores iniciais
  const handleResetGifts = () => {
    if (confirm("Isso irá redefinir a lista de presentes para os valores iniciais. Deseja continuar?")) {
      localStorage.setItem("gifts", JSON.stringify(initialGifts));
      setGifts(initialGifts);
      toast({
        title: "Lista de Presentes Redefinida",
        description: "A lista foi redefinida para os valores iniciais.",
      });
    }
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

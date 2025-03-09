
import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";

// Lista inicial de presentes
const initialGifts: Gift[] = [
  { id: 1, name: "Assadeira de aço inox", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Assadeira-a%C3%A7o-inox.png" },
  { id: 2, name: "Colher de pau", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Colher%20de%20pau.jpeg" },
  { id: 3, name: "Colher de arroz de silicone", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Colher-de-arroz-de-silicone.jpg" },
  { id: 4, name: "Concha de silicone", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Concha%20de%20silicone.png" },
  { id: 5, name: "Cortador de pizza", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Cortador%20de%20pizza.jpg" },
  { id: 6, name: "Espátula de bolo", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Esp%C3%A1tula-de-bolo.jpg" },
  { id: 7, name: "Expremedor de batata", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Expremedor-de-batata.jpg" },
  { id: 8, name: "Frigideira antiaderente 35 cm", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Frigideira%20antiaderente%2035%20cm.jpg" },
  { id: 9, name: "Fuê de silicone", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Fu%C3%AA%20de%20silicone.jpeg" },
  { id: 10, name: "Garrafa térmica", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Garrafa%20t%C3%A9rmica.jpg" },
  { id: 11, name: "Jogo de 3 assadeiras", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Jogo%20de%203%20assadeiras.jpg" },
  { id: 12, name: "Mini triturador de alimentos elétrico", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Mini%20triturador%20de%20alimentos%20el%C3%A9trico.jpg" },
  { id: 13, name: "Moedor de pimenta", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Moedor%20de%20pimenta.jpg" },
  { id: 14, name: "Pegador de macarrão de silicone", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Pegador%20de%20macarr%C3%A3o%20de%20silicone.jpeg" },
  { id: 15, name: "Pegador de silicone", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Pegador-de-silicone.jpg" },
  { id: 16, name: "Porta-tempeiros", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Porta-tempeiros.jpg" },
  { id: 17, name: "Refratário 45x35", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Refrat%C3%A1rio%2045x35.jpg" },
  { id: 18, name: "Refratário 30x20", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Refrat%C3%A1rio-30x20.jpg" },
  { id: 19, name: "Rolo de massas", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/Rolo%20de%20massas.jpg" },
  { id: 20, name: "Tábua de corte 45 cm", imageUrl: "https://raw.githubusercontent.com/GmateusM/Daniel/main/T%C3%A1bua-de-corte-45-cm.jpg" }
  { id: 21, name: "Panela antiaderente", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/046e7e1e-a566-4757-8606-1a72f00cd19c.png?token=AZV3EXCWSFHZMU75ETDXDFTHZYJ5E" },
  { id: 22, name: "tÃ¡bua de passar roupa dobrÃ¡vel", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/08086239-fa91-4c05-a225-593b708e6660.png?token=AZV3EXDUZV27X2AT6DURGADHZYJ5E" },
  { id: 23, name: "Conjunto de travessa de vidro", imageUrl: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/j/o/jogo-de-travessas-retangular-02-pecas-sempre_808899.webp" },
  { id: 24, name: "Moedor de pimenta", imageUrl: "https://ae-pic-a1.aliexpress-media.com/kf/Hf51e9f928b604a94bc18d87f8db37a71z.jpg_960x960q75.jpg_.avif" },
  { id: 25, name: "Jogo de panela antiaderente", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/1b979276-c6d3-4a53-b16a-75dd80751ca6.png?token=AZV3EXCZLRK5KUXFAEVDCKLHZYLKI" },
  { id: 26, name: "Panela de pressÃ£o antiaderente", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/510a9abe-9419-4062-9636-326620582f8c.png?token=AZV3EXANJHP6SXXINBVWZ6THZYLKI" },
  { id: 27, name: "TÃ¡bua de madeira 35cm", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/6d82db39-2656-4443-b5a6-59a48f10168d.png?token=AZV3EXBUYMAH4F53EQ6KZO3HZYLPQ" },
  { id: 28, name: "Kit porta azeite e vinagre", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/7f9d1bec-bc10-44aa-b116-bbe6988166be.png?token=AZV3EXB5C4HHS4NXNIEFPPLHZYLPQ" },
  { id: 29, name: "Liquidificador", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/a22436c0-bf91-44a3-9d43-bbccb9ed54d6.png?token=AZV3EXF327C5H2BQ3JDVB4LHZYLPQ" },
  { id: 30, name: "Assadeira inox", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/e3134c31-8df3-41d5-bc97-33fa123ee74f.png?token=AZV3EXHALXYGMXFPIIMBKBDHZYLPQ" },
  { id: 31, name: "Escada alumÃ­nio 5 degraus", imageUrl: "https://raw.githubusercontent.com/GmateusM/presentesdaniel/fbf8fd9089e4e1b247b7fca49475f650352ba5be/public/lovable-uploads/efcd1e9a-9bd3-455c-bc7e-8cd31b023649.png?token=AZV3EXFEYAL5X3I4AYUOGE3HZYLPQ" }
];

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [nextId, setNextId] = useState(21); // Para novos presentes adicionados

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

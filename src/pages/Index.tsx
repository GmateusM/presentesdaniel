
import { useState, useEffect } from "react";
import { GiftCard } from "@/components/GiftCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Gift, GiftReservation } from "@/types/gift";
import { Button } from "@/components/ui/button";

const gifts: Gift[] = [
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
];

const Index = () => {
  const [reservations, setReservations] = useState<GiftReservation>({});
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const savedReservations = localStorage.getItem("giftReservations");
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, GiftReservation } from "@/types/gift";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminPanelProps {
  gifts: Gift[];
  reservations: GiftReservation;
  onRemoveReservation: (giftId: number) => void;
}

const ADMIN_CREDENTIALS = {
  username: "Daniel",
  password: "12345",
};

export const AdminPanel = ({ gifts, reservations, onRemoveReservation }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newGiftName, setNewGiftName] = useState("");
  const [newGiftImage, setNewGiftImage] = useState("");

  const handleLogin = () => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const handleExportGifts = () => {
    // Criar uma string formatada com o novo presente
    const newGiftString = `  { id: ${gifts.length + 1}, name: "${newGiftName}", imageUrl: "${newGiftImage}" },\n`;
    
    // Criar o texto completo do array
    const fullGiftsArray = `const gifts: Gift[] = [\n${gifts.map(gift => 
      `  { id: ${gift.id}, name: "${gift.name}", imageUrl: "${gift.imageUrl}" },`
    ).join('\n')}\n${newGiftString}];`;

    // Criar um elemento de texto temporário
    const element = document.createElement("a");
    const file = new Blob([fullGiftsArray], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "gifts.ts";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg animate-fade-up">
        <h2 className="font-playfair text-2xl mb-6 text-center">Admin Login</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg animate-fade-in space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-playfair text-xl mb-4">Adicionar Novo Presente</h3>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Nome do Presente"
            value={newGiftName}
            onChange={(e) => setNewGiftName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="URL da Imagem"
            value={newGiftImage}
            onChange={(e) => setNewGiftImage(e.target.value)}
          />
          <Button 
            onClick={handleExportGifts}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Exportar Lista com Novo Presente
          </Button>
        </div>
      </div>

      <div>
        <h2 className="font-playfair text-2xl mb-6">Presentes Reservados</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Presente</TableHead>
              <TableHead>Reservado Por</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts.map(
              (gift) =>
                reservations[gift.id] && (
                  <TableRow key={gift.id}>
                    <TableCell className="font-medium">{gift.name}</TableCell>
                    <TableCell>{reservations[gift.id]}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onRemoveReservation(gift.id)}
                      >
                        Remover Reserva
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

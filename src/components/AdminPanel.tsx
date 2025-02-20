
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

  const handleLogin = () => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
    } else {
      alert("Credenciais inválidas");
    }
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
    <div className="mt-8 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="font-playfair text-2xl mb-6 text-center">Presentes Reservados</h2>
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
  );
};

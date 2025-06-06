
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { generateGiftsDownload } from "@/utils/downloadUtils";

interface AdminPanelProps {
  gifts: Gift[];
  reservations: GiftReservation;
  onRemoveReservation: (giftId: number) => void;
  onAddGift: (gift: Omit<Gift, "id">) => void;
  onRemoveGift: (giftId: number) => void;
}

const ADMIN_CREDENTIALS = {
  username: "Daniel",
  password: "12345",
};

export const AdminPanel = ({ 
  gifts, 
  reservations, 
  onRemoveReservation,
  onAddGift,
  onRemoveGift
}: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newGiftName, setNewGiftName] = useState("");
  const [newGiftImageUrl, setNewGiftImageUrl] = useState("");
  const { toast } = useToast();

  const handleLogin = () => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Erro de Login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAddGift = () => {
    if (newGiftName.trim() === "") {
      toast({
        title: "Erro ao Adicionar",
        description: "O nome do presente não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    // Verifica se a URL da imagem está vazia e usa um placeholder se estiver
    let imageUrl = newGiftImageUrl.trim();
    if (imageUrl === "") {
      imageUrl = "/placeholder.svg"; // Usa imagem placeholder se não for fornecida
    }
    
    // Se não começa com http ou /, adiciona / para indicar que é um caminho relativo
    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }
    
    // Chama a função de adicionar presente
    onAddGift({
      name: newGiftName.trim(),
      imageUrl: imageUrl
    });
    
    // Reseta os campos do formulário
    setNewGiftName("");
    setNewGiftImageUrl("");
    
    // Notifica o usuário
    toast({
      title: "Presente Adicionado",
      description: `O presente "${newGiftName.trim()}" foi adicionado com sucesso.`,
    });
  };

  const handleRemoveGift = (giftId: number, giftName: string) => {
    if (confirm(`Tem certeza que deseja remover o presente "${giftName}"?`)) {
      onRemoveGift(giftId);
      toast({
        title: "Presente Removido",
        description: `O presente "${giftName}" foi removido com sucesso.`,
      });
    }
  };

  const handleDownloadGiftsCode = () => {
    generateGiftsDownload(gifts);
    toast({
      title: "Código Gerado",
      description: "O arquivo com o código atualizado foi baixado com sucesso.",
    });
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
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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
      <h2 className="font-playfair text-2xl mb-6 text-center">Painel Administrativo</h2>
      
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleDownloadGiftsCode}
          className="bg-navy hover:bg-navy-dark text-white flex items-center gap-2"
        >
          <Download size={18} />
          Baixar Código Atualizado
        </Button>
      </div>
      
      <Tabs defaultValue="reservations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="gifts">Gerenciar Presentes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reservations">
          <h3 className="text-xl mb-4">Presentes Reservados</h3>
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
        </TabsContent>
        
        <TabsContent value="gifts">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl mb-4">Adicionar Novo Presente</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Presente</label>
                  <Input 
                    value={newGiftName}
                    onChange={(e) => setNewGiftName(e.target.value)}
                    placeholder="Ex: Jogo de panelas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                  <Input 
                    value={newGiftImageUrl}
                    onChange={(e) => setNewGiftImageUrl(e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                <Button onClick={handleAddGift} className="bg-gold hover:bg-gold-dark text-gray-900">
                  Adicionar Presente
                </Button>
              </div>
            </div>
            
            <h3 className="text-xl mb-4">Lista de Presentes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Presente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gifts.map((gift) => (
                  <TableRow key={gift.id}>
                    <TableCell>{gift.id}</TableCell>
                    <TableCell className="font-medium">{gift.name}</TableCell>
                    <TableCell>
                      {reservations[gift.id] 
                        ? <span className="text-amber-600">Reservado</span> 
                        : <span className="text-green-600">Disponível</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveGift(gift.id, gift.name)}
                        disabled={!!reservations[gift.id]}
                      >
                        Remover Presente
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

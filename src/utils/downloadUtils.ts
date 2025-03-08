
import { Gift } from "@/types/gift";

export const generateGiftsDownload = (gifts: Gift[]) => {
  // Format the gifts array as JavaScript code
  const giftsArrayCode = gifts
    .map(gift => {
      return `  { id: ${gift.id}, name: "${gift.name}", imageUrl: "${gift.imageUrl}" }`;
    })
    .join(",\n");

  // Create the complete file content
  const fileContent = `// Atualize este código em src/pages/Index.tsx

// Lista de presentes atualizada
const initialGifts = [
${giftsArrayCode}
];

/*
INSTRUÇÕES:
1. Copie todo o código acima
2. Abra o arquivo src/pages/Index.tsx no seu repositório GitHub
3. Substitua a variável initialGifts existente pelo código acima
4. Commit e push das alterações para atualizar o site
*/
`;

  // Create a blob and download link
  const blob = new Blob([fileContent], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  
  // Create and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presentes-atualizados.js';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

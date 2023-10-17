import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carinho Diário',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

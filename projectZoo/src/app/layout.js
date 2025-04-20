import './globals.css';

export const metadata = {
  title: 'Seu App',
  description: 'Descrição',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mira Bistro',
  description: 'Restaurant QR Menu & Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
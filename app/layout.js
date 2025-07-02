import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './fontawesome'
import '@/css/bootstrap.min.css';
import '@/css/feather.css';
import '@/css/fontawesome/fontawesome.css';
import '@/css/select2.min.css';
import '@/css/splide.min.css';
import '@/css/main.css';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LiveTutors - Find Your Perfect Tutor',
  description: 'Connect with expert tutors for personalized learning experiences',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=Gochi+Hand&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

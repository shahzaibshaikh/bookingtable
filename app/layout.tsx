import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Booking Table',
  description: 'Book tables online.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='bg-gray-100 min-h-screen w-screen'>
          <AuthContext>
            <main className='max-w-screen-2xl m-auto bg-white'>
              <Navbar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}

import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import { exo2, orbitron } from './fonts';
import './globals.css';
import { Metadata } from 'next';

interface LayoutProps {
    children: ReactNode;
}


export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
    },
    title: {
        default: 'Indie gamer',
        template: '%s | Indie gamer',
    }  
};



export default function RootLayout({ children } : LayoutProps)  {
    return (
        <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
            <body className="bg-cyan-50 flex flex-col px-6 py-3 min-h-screen">
                <header>
                    <NavBar />
                </header>
                <main className="grow py-3">
                  {children}
                </main>
                <footer className="border-t py-3 text-center text-xs">
                    Game data and image courtesy
                    of {' '}
                    <a href="https://rawg.io/" target="_blank, noreferrer"
                        className="text-cyan-900 hover: underline"
                        >RAWG</a>
                    
                </footer>
            </body>
        </html>
    );
}
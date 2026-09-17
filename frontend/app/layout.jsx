import StoreProvider from '@/store/StoreProvider';
import { SmoothScrollProvider } from '@/lib/SmoothScrollProvider';
import './globals.css';

export const metadata = {
    title: 'Looplab — Campus Tech Community',
    description: 'Looplab is a Pakistan leading tech community.',
    icons: {
        icon: '/assets/loop-logo.png',
        shortcut: '/assets/loop-logo.png',
        apple: '/assets/loop-logo.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/assets/loop-logo.png" type="image/png" />
                <link rel="shortcut icon" href="/assets/loop-logo.png" type="image/png" />
                <link rel="apple-touch-icon" href="/assets/loop-logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
            </head>
            <body>
                <StoreProvider>
                    <SmoothScrollProvider>
                        {children}
                    </SmoothScrollProvider>
                </StoreProvider>
            </body>
        </html>
    );
}



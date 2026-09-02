import StoreProvider from '@/store/StoreProvider';
import './globals.css';

export const metadata = {
    title: 'Looplab — Campus Tech Community',
    description: 'Looplab is a Pakistan leading tech community.',
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}


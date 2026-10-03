import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/Providers.tsx';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://mealai.app'),
  title: 'MealAI - AI Meal Planner & Recipe Generator',
  description: "Your personal AI chef. Turn what you have into something you'll love.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'MealAI - AI Meal Planner & Recipe Generator',
    description: "Your personal AI chef. Turn what you have into something you'll love.",
    type: 'website',
    images: ['/favicon.svg'],
  },
  twitter: {
    card: 'summary',
    title: 'MealAI - AI Meal Planner & Recipe Generator',
    description: "Your personal AI chef. Turn what you have into something you'll love.",
  },
};

export const viewport: Viewport = {
  themeColor: '#123524',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable}`}>
      <body className="min-h-screen bg-culinary-pattern font-sans text-neutral-900 antialiased selection:bg-amber-400 selection:text-neutral-900">
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_ZXhhbXBsZS5jbGVyay5hY2NvdW50cy5kZXYk'}>
          <Providers>
          {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocX - The Neural Network Behind Event Discovery",
  description: "Semantic search infrastructure for the fragmented cultural ecosystem. We don't build event apps. We build the intelligence that makes events discoverable.",
  keywords: ["event discovery", "semantic search", "AI", "NLP", "infrastructure", "neural network", "Berlin", "culture"],
  authors: [{ name: "LocX Team" }],
  creator: "LocX",
  publisher: "LocX",
  openGraph: {
    title: "LocX - The Neural Network Behind Event Discovery",
    description: "Semantic search infrastructure for the fragmented cultural ecosystem.",
    url: "https://locx.io",
    siteName: "LocX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocX - The Neural Network Behind Event Discovery",
    description: "Semantic search infrastructure for the fragmented cultural ecosystem.",
    creator: "@locx_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {/* Neural network cursor effect */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div id="neural-cursor" className="absolute w-4 h-4 bg-neural-green rounded-full opacity-50 transition-all duration-100 ease-out" style={{ mixBlendMode: "screen" }} />
        </div>
        
        {/* Matrix background effect */}
        <div className="matrix-bg" id="matrix-background" />
        
        {/* Main content */}
        <main className="min-h-screen bg-neural-dark">
          {children}
        </main>
        
        {/* Neural cursor script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('mousemove', (e) => {
                const cursor = document.getElementById('neural-cursor');
                if (cursor) {
                  cursor.style.left = e.clientX - 8 + 'px';
                  cursor.style.top = e.clientY - 8 + 'px';
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

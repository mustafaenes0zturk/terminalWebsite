import type { Metadata } from "next";
import "./globals.css";
import DraggableTerminal from "@/components/DraggableTerminal";
import { Noise } from "@/components/ui/noise";
import { Particles } from "@/components/ui/particles";

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "A terminal-style portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="min-h-screen w-screen overflow-hidden relative">
          <Particles
            className="absolute inset-0 md:block hidden"
            quantity={100}
            ease={80}
            color="#ffffff"
            refresh
          />
          <Noise 
            patternSize={75}
            patternRefreshInterval={4}
            patternAlpha={20}
          />
          <DraggableTerminal>
            {children}
          </DraggableTerminal>
        </main>
      </body>
    </html>
  );
}

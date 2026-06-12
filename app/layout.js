import "./globals.css";

export const metadata = {
  title: "NOCTURNA WEAR - Rock Metal Alternative Clothing",
  description: "Premium rock, metal, and alternative clothing. Express your style with NOCTURNA WEAR.",
  keywords: "metal clothing, alternative wear, rock fashion, band tees",
  author: "NOCTURNA WEAR",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#050505" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
import { Providers } from "./providers";

export const metadata = {
  title: "ALPHA Network Airdrop",
  description: "Claim your ALPHA tokens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000', color: '#fff' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
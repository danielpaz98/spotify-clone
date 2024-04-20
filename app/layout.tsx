// GLOBAL STYLES
import "./globals.css";
// FONTS
import { CircularStd } from "@/constants/fonts";
// LAYOUTS
import { MainLayout } from "@/layouts";
// PROVIDERS
import { ModalProvider, AuthProvider } from "@/providers";
// ACTIONS
import { getActiveProductsWithPrices, getLibraryData } from "@/actions";

export const metadata = {
  title: {
    default: "Spotify Clone",
    template: "Spotify Clone - %s",
  },
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const products = await getActiveProductsWithPrices();
  const libraryData = await getLibraryData();

  return (
    <html suppressHydrationWarning lang="en">
      <body className={CircularStd.className}>
        <AuthProvider>
          <ModalProvider products={products} />

          <MainLayout libraryData={libraryData}>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

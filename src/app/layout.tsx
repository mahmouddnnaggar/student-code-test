import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { ReactNode } from "react";
import { Exo } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Providers from "@/components/providers/Providers";
import { verifytoken } from "@/features/auth/server/auth.actions";
import { getLoggedUserCart } from "@/features/cart/server/cart.actions";
import { CartState } from "@/features/cart/store/cart.slice";

import "../styles/globals.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-exo",
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const authValues = await verifytoken();

  let defaultCartState: CartState = {
    cartId: null,
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
    error: null,
    isLoading: false,
  };

  let cartState = defaultCartState;

  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();
      cartState = {
        cartId: cartResponse.cartId,
        totalCartPrice: cartResponse.data.totalCartPrice,
        products: cartResponse.data.products as any,
        numOfCartItems: cartResponse.numOfCartItems,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      cartState = defaultCartState;
    }
  }

  return (
    <html lang="en">
      <body className={`${exo.variable} font-sans bg-gray-50 min-h-screen flex flex-col`}>
        <Providers preloadedState={{ auth: authValues, cart: cartState }}>
          <Navbar />
          <main className="flex-1 py-6">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </Providers>
      </body>
    </html>
  );
}
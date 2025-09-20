import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    //* make the page a vertical flex container that is at least the full viewport height
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* 
      //* Grows to fill all remaining vertical space between the header and footer. 
      //* If the page content is short, this expands to push the footer down.
      //* If the content is long, it just takes the space it needs. 
      */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

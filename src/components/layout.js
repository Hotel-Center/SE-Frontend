import Footer from "./Homepage/layouts/Footer";
import Navbar from "./Homepage/layouts/Navbar";

export default function Layout({ children }) {
  return (
    <div className="App h-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

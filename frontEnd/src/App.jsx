import AppRoutes from "./Routes/Routes"
import './App.css';
import './index.css';
import { store } from "./features/store";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {

  return (
    <div className="flex flex-col min-h-screen">
  <Navbar />

  {/* Le contenu prend tout l’espace restant */}
  <main className="flex-grow">
       <AppRoutes />
  </main>

  <Footer />
</div>
   
  )
}

export default App
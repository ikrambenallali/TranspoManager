import AppRoutes from "./Routes/Routes"
import './App.css';
import './index.css';
import { store } from "./features/store";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authSlice";
import { useEffect } from "react";

function App() {

   const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);
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
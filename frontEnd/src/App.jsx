import AppRoutes from "./Routes/Routes"
import './App.css';
import './index.css';
import { store } from "./features/store";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  console.log("Store:", store.getState());

  return (
    <div className="w-full ">
      <Navbar />
    <AppRoutes />
    <Footer />
    </div>
  )
}

export default App
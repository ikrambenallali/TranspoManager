import AppRoutes from "./Routes/Routes"
import './App.css';
import './index.css';
import { store } from "./features/store";

function App() {
  console.log("Store:", store.getState());

  return (
    <>
    <AppRoutes />
    </>
  )
}

export default App
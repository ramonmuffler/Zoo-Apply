import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Animals from "./pages/Animals";
import Events from "./pages/Events";
import Attractions from "./pages/Attractions";
import Contact from "./pages/Contact";
import Dining from "./pages/Dining";
import Tickets from "./pages/Tickets";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Reviews from "./pages/Reviews";
import ZooMapPage from "./pages/ZooMapPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/events" element={<Events />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/map" element={<ZooMapPage />} />
          <Route path="/map_to_zoo" element={<Navigate to="/map" replace />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

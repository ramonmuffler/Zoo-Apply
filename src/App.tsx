import { useState } from "react";
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
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "animals":
        return <Animals />;
      case "events":
        return <Events />;
      case "attractions":
        return <Attractions />;
      case "dining":
        return <Dining />;
      case "tickets":
        return <Tickets />;
      case "contact":
        return <Contact />;
      case "registration":
        return <Registration />;
      case "login":
        return <Login />;
      case "settings":
        return <Settings />;
      case "reviews":
        return <Reviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Header setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;

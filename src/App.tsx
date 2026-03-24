import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Animals from "./pages/Animals";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Dining from "./pages/Dining";
import Tickets from "./pages/Tickets";
import Registration from "./pages/Registration";
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
      case "dining":
        return <Dining />;
      case "tickets":
        return <Tickets />;
      case "contact":
        return <Contact />;
      case "registration":
        return <Registration />;
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

import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Animals from "./pages/Animals";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Dining from "./pages/Dining";
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
      case "dining":
        return <Dining />;
      case "events":
        return <Events />;
      case "contact":
        return <Contact />;
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

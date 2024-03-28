import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/UI_Kit/Header";
import Root from "./Root";

import "swiper/css";
import BackToTop from "./components/UI_Kit/BackToTop";
import { useEffect, useState } from "react";

function App() {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const screenHeight = window.innerHeight;

    const checkScroll = () => {
      if (window.scrollY > screenHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    document.addEventListener("scroll", checkScroll);

    return () => document.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="bg-black text-white w-screen min-h-screen">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="lg:rounded-lg w-full h-full space-y-8 pb-10">
            <Header />
            <Root />
            <BackToTop showBackToTop={showBackToTop} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

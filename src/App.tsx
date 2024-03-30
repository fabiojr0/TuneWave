import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/UI_Kit/Header';
import Root from './Root';

import 'swiper/css';
import BackToTop from './components/UI_Kit/BackToTop';
import { useEffect, useState } from 'react';
import HeaderTitle from './components/UI_Kit/HeaderTitle';

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

    document.addEventListener('scroll', checkScroll);

    return () => document.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="bg-black text-white w-full min-h-screen max-h-screen">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="w-full max-lg:space-y-8 max-lg:pb-10 lg:flex lg:gap-4">
            <Header />
            <div className="lg:bg-blackfy lg:p-4 lg:rounded-lg lg:w-full lg:min-h-[95vh] lg:space-y-4">
              <span className="max-lg:hidden">
                <HeaderTitle />
              </span>
              <Root />
            </div>
            <BackToTop showBackToTop={showBackToTop} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

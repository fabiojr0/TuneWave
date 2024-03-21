import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Root from "./Root";

import "swiper/css";

function App() {
  return (
    <div className="bg-black text-white w-screen min-h-screen">
      <Router>
        <div className="p-4 w-full h-full">
          <div className="lg:bg-blackfy lg:rounded-lg w-full h-full space-y-4">
            <Header />
            <Root />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

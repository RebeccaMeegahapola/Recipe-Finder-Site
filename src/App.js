import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Favourite from './pages/Favourite';

function App() {
  return (
    <div className="h-[200vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/fav" element={<Favourite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

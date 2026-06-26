import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FindATree from './pages/FindATree';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/find" element={<FindATree />} />
        <Route path="/communities" element={<ComingSoon title="communities" />} />
        <Route path="/you" element={<ComingSoon title="you" />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ComingSoon title="about us" />} />
        <Route path="/find" element={<ComingSoon title="find a tree" />} />
        <Route path="/communities" element={<ComingSoon title="communities" />} />
        <Route path="/you" element={<ComingSoon title="you" />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CreateImage from './components/CreateImage';
import Gallery from './components/Gallery';
import Settings from './components/Settings';
import ImageViewerPage from './components/ImageViewerPage';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Help from './components/Help';
import Contact from './components/Contact';
import Report from './components/Report';
import Developer from './components/Developer';
import SupportPage from './components/SupportPage';
import WelcomePopup from './components/WelcomePopup';
import ScrollToTop from './components/ScrollToTop';
import SecurityHush from './components/SecurityHush';
import './App.css';

function App() {
  return (
    <Router>
      <SecurityHush />
      <WelcomePopup />
      <ScrollToTop />
      <Routes>
        <Route path="/"          element={<Navigate to="/splash" replace />} />
        <Route path="/splash"    element={<SplashScreen />} />
        <Route path="/home"      element={<HomeScreen />} />
        <Route path="/create"    element={<CreateImage />} />
        <Route path="/gallery"   element={<Gallery />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/view"      element={<ImageViewerPage />} />
        <Route path="/about"     element={<About />} />
        <Route path="/terms"     element={<Terms />} />
        <Route path="/privacy"   element={<Privacy />} />
        <Route path="/help"      element={<Help />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/report"    element={<Report />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/support"   element={<SupportPage />} />
        <Route path="*"          element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

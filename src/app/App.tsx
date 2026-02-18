import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorksPage from './pages/WorksPage';
import BeatBitsCase from './pages/case/BeatBitsCase';
import ChronogoCase from './pages/case/ChronogoCase';
import HertaSecurityCase from './pages/case/HertaSecurityCase';
import MonoBankCase from './pages/case/MonoBankCase';
import SynapHelmetCase from './pages/case/SynapHelmetCase';
import CountifyCase from './pages/case/CountifyCase';
import InfamiaMuseumCase from './pages/case/InfamiaMuseumCase';
import TrashtourLDNCase from './pages/case/TrashtourLDNCase';
import TrashtourBERCase from './pages/case/TrashtourBERCase';
import TrashtourBCNCase from './pages/case/TrashtourBCNCase';
import LaOllaComunCase from './pages/case/LaOllaComunCase';
import GoHomeMagCase from './pages/case/GoHomeMagCase';
import HertaverseCase from './pages/case/HertaverseCase';
import Beethoven2020Case from './pages/case/Beethoven2020Case';
import MiGatoBolanoCase from './pages/case/MiGatoBolanoCase';
import LetrarteCase from './pages/case/LetrarteCase';
import FILSACase from './pages/case/FILSACase';
import CuartaEstacionCase from './pages/case/CuartaEstacionCase';
import CirkubrickCase from './pages/case/CirkubrickCase';
import InfinitoCase from './pages/case/InfinitoCase';
import ArcFestivalCase from './pages/case/ArcFestivalCase';
import SedasRinaMariaCase from './pages/case/SedasRinaMariaCase';
import GuzStudioCase from './pages/case/GuzStudioCase';
import UnoTarotCase from './pages/case/UnoTarotCase';
import OfficeApocalypseCase from './pages/case/OfficeApocalypseCase';
import HatersGonnaHateCase from './pages/case/HatersGonnaHateCase';
import MeanBotCase from './pages/case/MeanBotCase';
import ReadMeRightCase from './pages/case/ReadMeRightCase';
import BreakTheFrameCase from './pages/case/BreakTheFrameCase';
import LynchUniverseCase from './pages/case/LynchUniverseCase';
import { ScrollToTop } from './components/ScrollToTop';
import { MouseTrail } from './components/MouseTrail';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <MouseTrail />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/case/beatbits" element={<BeatBitsCase />} />
          <Route path="/case/chronogo" element={<ChronogoCase />} />
          <Route path="/case/herta-security" element={<HertaSecurityCase />} />
          <Route path="/case/monobank" element={<MonoBankCase />} />
          <Route path="/case/synaphelmet" element={<SynapHelmetCase />} />
          <Route path="/case/countify" element={<CountifyCase />} />
          <Route path="/case/infamia-museum" element={<InfamiaMuseumCase />} />
          <Route path="/case/trashtour-ldn" element={<TrashtourLDNCase />} />
          <Route path="/case/trashtour-ber" element={<TrashtourBERCase />} />
          <Route path="/case/trashtour-bcn" element={<TrashtourBCNCase />} />
          <Route path="/case/la-olla-comun" element={<LaOllaComunCase />} />
          <Route path="/case/go-home-mag" element={<GoHomeMagCase />} />
          <Route path="/case/hertaverse" element={<HertaverseCase />} />
          <Route path="/case/beethoven2020" element={<Beethoven2020Case />} />
          <Route path="/case/mi-gato-bolano" element={<MiGatoBolanoCase />} />
          <Route path="/case/letrarte" element={<LetrarteCase />} />
          <Route path="/case/filsa" element={<FILSACase />} />
          <Route path="/case/cuarta-estacion" element={<CuartaEstacionCase />} />
          <Route path="/case/cirkubrick" element={<CirkubrickCase />} />
          <Route path="/case/infinito" element={<InfinitoCase />} />
          <Route path="/case/arc-festival" element={<ArcFestivalCase />} />
          <Route path="/case/sedas-rina-maria" element={<SedasRinaMariaCase />} />
          <Route path="/case/guz-studio" element={<GuzStudioCase />} />
          <Route path="/case/uno-tarot" element={<UnoTarotCase />} />
          <Route path="/case/office-apocalypse" element={<OfficeApocalypseCase />} />
          <Route path="/case/haters-gonna-hate" element={<HatersGonnaHateCase />} />
          <Route path="/case/mean-bot" element={<MeanBotCase />} />
          <Route path="/case/read-me-right" element={<ReadMeRightCase />} />
          <Route path="/case/break-the-frame" element={<BreakTheFrameCase />} />
          <Route path="/case/lynch-universe" element={<LynchUniverseCase />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
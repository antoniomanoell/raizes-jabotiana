import { LandingPage } from './components/LandingPage';
import { useLenis } from './hooks/useLenis';
import './index.css';

function App() {
  useLenis();
  return <LandingPage />;
}

export default App;

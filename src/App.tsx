import './App.css';
import { SiteHeader } from './components/layouts/SiteHeader';
import { ThemeProvider } from './components/providers/ThemeProvider';
import QRCodeScanner from './components/QRCodeScanner';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <SiteHeader />
      <QRCodeScanner />
    </ThemeProvider>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsContextProvider } from './misc/setting-context.tsx'
import './index.css'
import App from './App.tsx'
import Board from './pages/Board.tsx';

createRoot(document.getElementById('root')!).render(
  <SettingsContextProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </SettingsContextProvider>
)

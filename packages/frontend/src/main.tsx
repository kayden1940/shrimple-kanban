import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsContextProvider } from './misc/setting-context.tsx'
import './index.css'
import App from './App.tsx'
import Board from './pages/Board.tsx';
import Boards from './pages/Boards.tsx';

createRoot(document.getElementById('root')!).render(
  <SettingsContextProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/boards/123" element={<Board />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </SettingsContextProvider>
)

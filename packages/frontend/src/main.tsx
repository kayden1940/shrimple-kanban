import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsContextProvider } from './misc/setting-context.tsx'
import './index.css'
import App from './App.tsx'
import Board from './pages/Board.tsx';
import { Boards } from './pages/Boards.tsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Login from './pages/Login.tsx';
import { createActor } from 'xstate';
import { machine } from './machine.ts';

const queryClient = new QueryClient()

export const actor = createActor(machine);
// actor.subscribe(snapshot => {
//   console.log('State:', snapshot.value);
//   console.log('Context', snapshot.context)
// });
actor.start();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SettingsContextProvider>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<App />} /> */}
          <Route path="/boards/:id" element={<Board />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<App />} /> */}
        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>
  </QueryClientProvider>
)

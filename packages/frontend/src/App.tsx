import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from "@xstate/react";
import { machine } from "./machine"
// import { createActor } from 'xstate';
// // import BoardContainer from "./components/BoardContainer";
// // import BoardDetail from './pages/BoardDetail';

// export const actor = createActor(machine);
// actor.start();

function App() {
  // const appState = useSelector(actor, (state) => state.value);
  // console.log('appState', appState)
  const [count, setCount] = useState(0)

  return (
    // <BoardDetail />
    <h1>App</h1>
  )
}

export default App

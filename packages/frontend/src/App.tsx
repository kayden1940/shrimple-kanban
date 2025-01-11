import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from "@xstate/react";
import { machine } from "./machine"
import { createActor } from 'xstate';
// import BoardContainer from "./components/BoardContainer";
// import BoardDetail from './pages/BoardDetail';

export const actor = createActor(machine);
actor.start();

function App() {
  const appState = useSelector(actor, (state) => state.value);
  // console.log('appState', appState)
  const [count, setCount] = useState(0)

  // <>
  //   {/* <span>{appState}</span>
  //   <br />
  //   {
  //     Object.entries(machine?.states?.[appState]?.config?.on ?? []).map(([name, cbs], i) => {
  //       return (
  //         <button key={name} onClick={() => { actor.send({ type: name }) }}>
  //           {name}
  //         </button>
  //       )
  //     })
  //   } */}
  // </>
  return (
    // <BoardDetail />
    <h1>here</h1>
  )
}

export default App

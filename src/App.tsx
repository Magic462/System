// // import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import type { MouseEvent } from 'react'

// function App() {
//   // const [count, setCount] = useState(0)
//   const setCount = (event: MouseEvent<HTMLButtonElement>,name: string)=>{
//     event.preventDefault()
//     console.log(111);
//   }
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank" style={{color: 'red',backgroundColor: 'white'}}>
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={(event)=>{setCount(event,'a')}}>
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router'
import './App.css'
// import Register from './pages/Register';

const App: React.FC = () => {
    return (
      <RouterProvider router={routerConfig}></RouterProvider>
    );
};

export default App;
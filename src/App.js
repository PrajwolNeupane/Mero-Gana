import PlayList from "./Screens/PlayList";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Screens/HomePage";



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
          </>
        } />
        <Route path="/:id" element={
          <>
            <PlayList />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;

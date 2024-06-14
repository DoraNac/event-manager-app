import NewEventTest from "./components/NewEventTest"
import NewEvent from "./components/NewEvent";
import DisplayAllEvents from "./components/DisplayAllEvents";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDescription from "./components/EventDescription";

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DisplayAllEvents/>}/>
      <Route path='/event/:id' element={<EventDescription/>}/>
    {/* <NewEventTest/>  */}
    {/* <NewEvent/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App

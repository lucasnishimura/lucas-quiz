import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Score from "./Score";
import Treasure from "./Treasure";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          {/* <Route index element={<Home />} /> */}
        {/* </Route> */}
        <Route path="score" element={<Score />} />
        <Route path="treasure" element={<Treasure />} />
    
      </Routes>
    </BrowserRouter>
  );
}
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

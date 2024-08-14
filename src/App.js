import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Score from "./Score";
import Treasure from "./Treasure";
import Sucrilhos from "./Sucrilhos";
import Beterraba from "./Beterraba";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          {/* <Route index element={<Home />} /> */}
        {/* </Route> */}
        <Route path="score" element={<Score />} />
        <Route path="treasure" element={<Treasure />} />
        <Route path="sucrilhos" element={<Sucrilhos />} />
        <Route path="beterraba" element={<Beterraba />} />
      </Routes>
    </BrowserRouter>
  );
}
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

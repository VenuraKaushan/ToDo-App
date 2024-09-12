import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginUser } from "./pages/Login";
import { RegisterUser } from "./pages/Register";
import { Todo } from "./pages/Todo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginUser />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/todos' element={<Todo />} />
      </Routes>
    </Router>
  )
}

export default App

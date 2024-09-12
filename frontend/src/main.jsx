import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TodoProvider } from './context/TodoContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TodoProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TodoProvider>
  </AuthProvider>

)

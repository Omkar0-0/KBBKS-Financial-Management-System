import { useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import VendorMaster from './pages/VendorMaster'
import ExpenseEntry from './pages/ExpenseEntry'
import PaymentEntry from './pages/PaymentEntry'
import Login from './pages/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [page, setPage] = useState('dashboard')

  function handleLogin() {
    setIsAuthenticated(true)
  }

  function handleLogout() {
    setIsAuthenticated(false)
  }

  function renderPage() {
    if (page === 'dashboard') return <Dashboard />
    if (page === 'vendors') return <VendorMaster />
    if (page === 'expense') return <ExpenseEntry />
    if (page === 'payment') return <PaymentEntry />
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <MainLayout setPage={setPage} onLogout={handleLogout}>
      {renderPage()}
    </MainLayout>
  )
}

export default App

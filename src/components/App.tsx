'use client'

import { useState } from 'react'
import LandingPage from './LandingPage'
import MainLayout from './MainLayout'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignIn = () => {
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LandingPage onSignIn={handleSignIn} />
  }

  return <MainLayout onSignOut={handleSignOut} />
}
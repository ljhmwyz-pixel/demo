import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/layouts/MainLayout'
import HomePage from '@/pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
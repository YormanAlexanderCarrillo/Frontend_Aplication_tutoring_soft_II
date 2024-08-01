import Dashboard from '@/components/Dashboard/Dashboard'
import React from 'react'

function DashboardPage() {
  return (
    <div className='h-screen overflow-hidden'>
      <div className="flex justify-center items-center bg-yellow-500 mt-16">
        <h2>Información grafica</h2>
      </div>
      <div className='flex justify-center pt-10 h-screen'>
      <Dashboard/>
    </div>
    </div>
    
  )
}

export default DashboardPage
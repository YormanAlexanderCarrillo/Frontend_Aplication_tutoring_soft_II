'use client'
import CalendarEvents from '@/components/CalendarEvents'
import CardInfo from '@/components/CardInfo'
import React from 'react'

function SchedulePage() {
  return (
    <div className="mt-16">
    <div className="flex justify-center items-center bg-yellow-500">
      <h2>Agendamiento tutoria</h2>
    </div>
    <div className="flex flex-col sm:flex-row 2xl:mt-24">
      <div className="flex justify-center items-center pt-7 pl-5 sm:pt-0 sm:w-1/2 sm:mt-0 ">
        <CalendarEvents />
      </div>
      <div className="flex justify-center sm:w-1/2 ">
        <div className="block w-full "> 
          <div className="mb-2 w-full ">
            <CardInfo/>
            <CardInfo/>
            <CardInfo/>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default SchedulePage
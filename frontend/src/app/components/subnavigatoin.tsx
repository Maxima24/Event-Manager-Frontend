'use client'
type Props ={
    name:string
}
import React from 'react'
function NavigationSpan({name}:Props) {
    if(name){

    }
  return (
          <span className=' border-transparent p-1 px-2 border-2  rounded-xl hover:border-gray-300'>{name}</span>
  )
}

export default NavigationSpan
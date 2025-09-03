import React from 'react'

const Logo = ({classname = ' ',size = ''}) => {
  return (

         <div className={`flex justify-center items-center ${classname}`}>
                <img src="/logo.png" className="h-10 w-auto" />
                <span className={`font-bold ${size}`}>TaskMate</span>
              </div>

  )
}

export default Logo

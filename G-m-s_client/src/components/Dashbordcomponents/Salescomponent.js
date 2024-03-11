import React from 'react'
import "./Salescomponet.css"
function Salescomponent({Title, value ,icon,extra}) {
  return (
    <div className='component_container'>
       <div><h6 className=''> {Title}</h6></div>
       <div>{icon}<h5 >{value} <span className='text-secondary'>{extra}</span></h5></div>
        </div>
  )
}

export default Salescomponent
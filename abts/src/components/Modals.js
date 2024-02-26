import React from 'react'

function Modals({text, type}) {
  if(type=="error")
  {return (
    <div className="alert alert-danger alert-dismissible visible">
            <strong>Error!</strong> <h6>{text}</h6>
        </div>
  )}
  else if (type="success")
  {
    return (
    <div className="alert alert-success alert-dismissible visible">
            <strong>Success!</strong> <h6>{text}</h6>
        </div>
  )}
}

export default Modals
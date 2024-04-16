import React from 'react'

function Modals({text, type}) {
  if(type=="error")
  {return (
    <div className="alert alert-danger alert-dismissible visible">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Error!</strong> <h6>{text}</h6>
        </div>
  )}
  else if (type="success")
  {
    return (
    <div className="alert alert-success alert-dismissible visible">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> <h6>{text}</h6>
        </div>
  )}
  else if (type="success2")
  {
    return (
    <div className="alert alert-success alert-dismissible visible">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> <h6>{text}</h6>
        </div>
  )}
}

export default Modals
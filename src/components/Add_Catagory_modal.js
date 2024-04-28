import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
function Add_Catagory_modal({modal_status,Modal_toggle,new_catagory,setNewCatagory,handleAddCatagory}) {
  return (
    <div className='container-fluid'>
        <Modal isOpen={modal_status} size="lg" toggle={Modal_toggle} >
          <ModalHeader className='modal_color' toggle={Modal_toggle}>Add Catagory</ModalHeader>
          <ModalBody className='modal_color'>
            <form onSubmit={handleAddCatagory}>
              <div className='mb-3 mt-3'>
                <label htmlFor='email' className='form-label'>Enter new Catagory:</label>
                <input
                  type='text'
                  className='form-control'
                  required
                  value={new_catagory}
                  onChange={(e) => setNewCatagory(e.target.value)}
                  id='catagory'
                  placeholder='Enter Catagory'
                />
              </div>
            <div className='row px-4 pt-3'>
            <button type='submit' className='btn btn-primary fw-bold btn-block'>Add</button>
            </div>
            </form>
            {/* Display error message if error_alert is true */}
            
          </ModalBody>
          <ModalFooter className='modal_color'>
            <Button color='secondary' onClick={Modal_toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
  )
}

export default Add_Catagory_modal
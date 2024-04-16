import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modals from './Modals';

function Password_change_email_modal({ modal_status, Modal_toggle, handleForgotPasswordSubmit, setEmail, email, error_alert, error_text, error_type }) {

    return (
      <div className='container-fluid'>
        <Modal isOpen={modal_status} size="xl" toggle={Modal_toggle} >
          <ModalHeader className='modal_color' toggle={Modal_toggle}>Change Password</ModalHeader>
          <ModalBody className='modal_color'>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className='mb-3 mt-3'>
                <label htmlFor='email' className='form-label'>Enter your email to reset password:</label>
                <input
                  type='email'
                  className='form-control'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  placeholder='Enter your email'
                />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {/* Display error message if error_alert is true */}
            {error_alert && <Modals type={error_type} text={error_text} />}
          </ModalBody>
          <ModalFooter className='modal_color'>
            <Button color='secondary' onClick={Modal_toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  

export default Password_change_email_modal;

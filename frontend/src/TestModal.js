import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="test-modal-container">
      <Button variant="primary" onClick={handleShow}>
        Popup'u Aç
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose} 
        centered 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          top: '50%',
          transform: 'translateY(-50%)',
          margin: '0 auto'
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Benutzer bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Benutzername</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Değişiklikleri Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TestModal;

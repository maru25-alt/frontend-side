import React, { useEffect, useState } from "react";
import axios from '../../axios';
import {Modal, Button} from 'react-bootstrap'

const Photos = () => {
  const [photos, setphotos] = useState([])
  const [selectedImg, setselectedImg] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setselectedImg({})
  };
  const handleShow = (img) => {
    setShow(true);
    setselectedImg(img)
  };

  useEffect(() => {
    axios.get('/photos').then(res => {
      console.log(res)
      setphotos(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div className="container">
      <h1> Photo gallery </h1>

      {/* Ignore the following line, it is just to show what the path of the images will be. */}
      <div className="row">
        {photos.length > 0 ? 
        <> {photos && photos.map(photo => {
         return(<div key={photo.src}  className=" col-xs-12 col-sm-6 col-md-3">
           <img className="photo" onClick={() => handleShow(photo)}  src={`http://localhost:5000/upload_directory/${photo.src}`} alt={photo.src}/>
         </div>) 
        })}</>
        : 
        <div>
           No photos yet
          </div>}
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <span className="text-info"> File Size:</span> {selectedImg?.filesize}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`http://localhost:5000/upload_directory/${selectedImg.src}`} alt={selectedImg.src}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Photos;

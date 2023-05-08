import { useState,useRef } from 'react';
import { Button, Image } from 'react-bootstrap';
import { PhotoIcon } from '@heroicons/react/24/outline'

function UpdateProfilePicture() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    // Send the image to the server using fetch or axios
    console.log('Image:', image);
  }

  return (
    <form className='p-3' onSubmit={handleSubmit}>
      <div>
        <button className='d-flex justify-content-start align-items-end w-50 h-50 border-0 btn rounded-3 p-0' type="button" onClick={handleButtonClick}>
          {!image && <Image src='./avatar.jpg' className='w-50 h-50 rounded-3' alt="Default Pic"/>}
          {image && <Image src={URL.createObjectURL(image)} className='w-50 h-50 rounded-3' alt="Preview" />}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <Button className='mt-3 ms-0 rounded-3' type="submit">
      <PhotoIcon className='me-1' style={{height:"20px",width:"20px"}}/>
      Change Picture
      </Button>
    </form>
  );
}

export default UpdateProfilePicture;
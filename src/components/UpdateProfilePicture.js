import { useState,useRef,useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { PhotoIcon } from '@heroicons/react/24/outline'
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import { getpic } from './pictureAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProfilePicture() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState('');
  const [scale, setScale] = useState(1);
    // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
    const localaccessToken = localStorage.getItem('access_token');
    const sessionaccessToken = sessionStorage.getItem('access_token');
    const token = localaccessToken || sessionaccessToken;

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  let editor = null;
  if (image) {
    editor = (
      <AvatarEditor
        image={image}
        width={250}
        height={250}
        border={0}
        borderRadius={125}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        rotate={0}
        ref={(ref) => (editor = ref)}
      />
    );
  }

  useEffect(()=>{
    getpic().then((url) => setImageUrl(url));
  },[]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const canvas = editor.getImageScaledToCanvas().toDataURL();
    const croppedImage = await fetch(canvas).then(res => res.blob());
    const formData = new FormData();
    formData.append('file', croppedImage, 'avatar.png');
    setImage(canvas);

    try {
      axios.put('/picture/profile-picture', formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
      toast(response.data.message,{type: toast.TYPE.SUCCESS})
      getpic().then((url) => setImageUrl(url));
      setImage(null);
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className='p-3' onSubmit={handleSubmit}>
        <ToastContainer position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
      <div className='d-flex'>
        <button className='border-0 btn p-0' type="button" onClick={handleButtonClick}>
          {!image && !imageUrl && <Image src='./avatar.jpg' className='rounded-circle' width={250} height={250} alt="Default Pic"/>}
          {!image && imageUrl && <Image src={imageUrl} alt="Profile" className='rounded-circle' width={250} height={250} />}
          {image && editor }
          {/* <Image src={URL.createObjectURL(image)} className='w-50 h-50 rounded-3' alt="Preview" /> */}
        </button>
        {image && <input type="range" min="1" max="3" step="0.01" value={scale} onChange={handleScaleChange} style={{ transform: "rotate(-90deg)" }}/>}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <div className='d-flex'>
      <Button className='mt-3 rounded-3' type="submit">
      <PhotoIcon className='me-1' style={{height:"20px",width:"20px"}}/>
      Change Picture
      </Button>
      </div>
    </form>
  );
}

export default UpdateProfilePicture;
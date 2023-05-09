import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get('/picture/profile-picture', { responseType: 'blob' })
      .then(response => {
        const imageObjectURL = URL.createObjectURL(response.data);
        setImageUrl(imageObjectURL);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {imageUrl !== '' ?
        <img src={imageUrl} alt="Profile" className='h-25 w-25' />
        :
        <p>No profile picture found.</p>
      }
    </div>
  );
}

export default ProfilePicture;
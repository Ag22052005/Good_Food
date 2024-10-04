import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserSideBar } from "../components/UserSideBar";

function ProfilePage() {
  const [profileImg, setProfileImg] = useState("");
  const token = localStorage.getItem("authToken");
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/getUserInfo`, {
        headers: {
          authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileImg(res.data.profileImg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uploaded]);

  const ProfilePageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('myfile', file);
      axios
        .post(
          `${import.meta.env.VITE_HOST_URL}/profile`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', 
              'Authorization': `Bearer ${token}`,  
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setUploaded(!uploaded);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    <UserSideBar></UserSideBar>
    <div style={{textAlign:'center'}}>
      <label htmlFor="myfile" style={{ cursor: 'pointer',display:'block',margin:'4rem' }}>
        <img src="upload_icon_url" alt="Upload" style={{ width: '50px', height: '50px' }} />
      </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
        className="myfile"
        style={{ display: 'none' }} 
        onChange={ProfilePageHandler}
        />

      {profileImg && <img src={profileImg} alt="Profile" style={{width:'150px',height:'150px'}} />}
    </div>
        </>
  );
}

export default ProfilePage;

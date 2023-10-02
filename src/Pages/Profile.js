import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

    

  useEffect(() => {
    
    fetchUserData();
  }, [token]);

  const fetchUserData = () => {
    if (!token) {
      return; // Don't make the request if there's no token
    }

    const lookupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50`;
    const data = {
      idToken: token,
    };

    fetch(lookupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((responseData) => {
        // Extract user data from the response and update the state
        const user = responseData.users[0];
        setFullName(user.displayName || ''); // Set full name if available
        setPhotoUrl(user.photoUrl || ''); // Set photo URL if available
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  };




  const handleUpdate = () => {
    const updateUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50';
  
    const data = {
      idToken: token,
      displayName: fullName,
      photoUrl: photoUrl,
      returnSecureToken: true,
    };
  
    fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user details');
        }
        return response.json();
      })
      .then(responseData => {
        console.log('User details updated successfully', responseData);
      })
      .catch(error => {
        console.log('Error updating user details', error);
      });
      fetchUserData();
  };
  
  const handleGetData = () => {
    // Set the token to trigger fetching user data
    setToken(localStorage.getItem('token'));
    console.log('get data is called')
  };

  return (
    <>
      <div className="login-page-container">
        <div className="left-">
          <h5 className='bold-text'>Winners never quite, Quitters never win.</h5>
        </div>
        <div className="right-div">
          <p className="profile-para bold-text">
            Your Profile is 64% completed.A complete Profile has higher chances of landing a job.
            <p className='para'>Complete Now</p>
          </p>
        </div>
      </div>
      <div className="profile-container">
        <Form>
          <div className="contact-details bold-text">
            <p>Contact Details</p>
            <Button variant="primary justify-content-end"  onClick={handleGetData}>
              Get Data
            </Button>
          </div>
          <div className="form-fields ">
            <div className="form-group bold-text">
              <label htmlFor="fullName">Full Name:</label>
              <Form.Control
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group bold-text">
              <label htmlFor="photoUrl">Profile Photo URL:</label>
              <Form.Control
                type="text"
                id="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="update-button">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Profile;

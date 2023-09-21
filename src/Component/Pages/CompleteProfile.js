import React, { useState } from 'react';
import '../Pages/CompleteProfile.css'; // Import your CSS file
import { useContext } from 'react';

// Import AuthContext from wherever it's defined
import { AuthContext } from '../../Store/Auth-Context';

function CompleteProfile() {
    const [fullName, setFullName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoggedIn) {
            const requestData = {
                idToken: authCtx.token, 
                displayName: fullName,
                photoUrl: photoUrl,
                returnSecureToken: true,
            };

            // Make the API request to update user details
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBzW0t8Ep_cs-0uc5MmeH1RwgplsSILTnc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response from Firebase here
                    console.log(data);
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.error('Error updating user details:', error);
                });
        }
    };

    return (
        <div className="container">
            <h1>Winners Never Quit, Quitters Never Win</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <label htmlFor="photoUrl">Photo Profile URL:</label>
                    <input
                        type="text"
                        id="photoUrl"
                        name="photoUrl"
                        placeholder="Enter your photo profile URL"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default CompleteProfile;

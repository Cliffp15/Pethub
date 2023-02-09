import React, { useState } from 'react';
import axios from 'axios';


const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [rePassword, setRePassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  // const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (e) => {
    console.log("button was pressed")

    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      phone: phone,
      city: city,
      state: state,
      zip: zip,
    };

    axios({
      method: "post",
      url: "http://localhost:3001/signup",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert('User signed up successfully');

      })
      .catch(function (response) {
        //handle error
        console.log(response);
        alert('An error occurred. Please try again.');
      });

  };
  return (
    <form onSubmit={handleSubmit}>

      <div>
        <input
          placeholder='First Name'
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder='Last Name'
          type="text"
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
      </div>

      <div>
        <input
        placeholder='User Name'
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          />
      </div>

      <div>
        <input
        placeholder='Email'
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </div>

      <div>
        <input
        placeholder='Password'
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
      </div>

      {/* <div>
        <input
        placeholder='Re-enter Password'
          type="text"
          id="rePassword"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          />
      </div> */}

      <div>
        <input
        placeholder='Phone'
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
      </div>

      <div>
        <input
        placeholder='City'
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
      </div>

      <div>
        <input
        placeholder='State'
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          />
      </div>
      
      <div>
        <input
          placeholder='Zip'
          type="text"
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          />
      </div>
      <button type="submit"> Sign Up</button>
    </form>
  );


};

export default SignUp;


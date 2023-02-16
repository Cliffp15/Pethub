import { useState,useEffect, React} from 'react';
import GoogleMapReact from 'google-map-react'
import axios from 'axios';

const FindShelter = (props) => {

  const [shelters,setShelters] = useState([])
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Get the user's location using the HTML5 Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        error => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);


  useEffect(() => {
    // Get a list of shelters from the Petfinder API
    const getShelters = async () => {
      const response = await axios.get(
        'https://api.petfinder.com/v2/organizations',
        {
          headers: {
            Authorization: `Authorization: Bearer 2EDep4nUnZldfKmEUG8j3YJlJcMG3dAlUZUA8IJeRA4BvbJ4z9`,
          },
          params: {
            location: `${location.lat},${location.lng}`,
            distance: 25,
            limit: 10,
          },
        }
      );
      setShelters(response.data.organizations);
    };
    if (location) {
      getShelters();
    }
  }, [location]);

  const Marker = () => <div style={{ color: 'red', fontSize: '32px' }}>📍</div>;
  
  return (
    <div style={{ height: '700px', width: '100%' }}>
      {error && <div>{error}</div>}
      {location && (
        <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{ key:"AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE" }}
          defaultCenter={location}
          defaultZoom={16}
        >
        <Marker lat={location.lat} lng={location.lng}></Marker>
        </GoogleMapReact>
      )}
    </div>
  );
};

export default FindShelter;

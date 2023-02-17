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
            "Accept": "application/jason",
            "Content-type": "application/jason",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyRURlcDRuVW5abGRmS21FVUc4ajNZSmxKY01HM2RBbFVaVUE4SUplUkE0QnZiSjR6OSIsImp0aSI6Ijg3NzlmMjI4ZmI0YzAxOTExMWZlMzRlMjNhYWVjZTg0ODU3MGJhYzFhY2U3ODI5MzY3YzYyNTU2MWM2YWFlN2YzMzM1Nzk1NzQ4ZjgwOTViIiwiaWF0IjoxNjc2NTg4MjE5LCJuYmYiOjE2NzY1ODgyMTksImV4cCI6MTY3NjU5MTgxOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.zjYSJA9FBEESs1a8V33LPP7yLY4cs2rL9LLm8IMFzTKIAocHlZ9ZmvycQsvEHWm4fD5Etyc4db064ob-xEkzYT8DAfg2mN9xL_F8k3DG564Ub196dNsFyfoT4A9yy0hMoru2gwfwqwPNA16dZAgm3i8NITN9WiK27pOhn3y_4iAD5tnD4U52BGjIOofpcLiES_0zT5X6Sz3rUWMfe-CWWx3PFETV0VyAWZhZzCsDzwPEVM_51WlqWfoH-BHAneNiQ3u-TH_eAjcsjvs3whsuD4DXdpFzs5JiIgDl_S7loz3fEWFMPYZVtCukdEEUZWVT7rIjtj93ChQokt8xKHZfhA"
          },
          params: {
            location: `${location.lat},${location.lng}`,
            distance: 25,
            limit: 15,
          },
        }
      );
      // console.log(response.data)
      setShelters(response.data.organizations);
    };
    if (location) {
      getShelters();
    }
  }, [location]);

  const getShelterCoordinates = async shelter => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        shelter.name
      )}&inputtype=textquery&fields=geometry&key=AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE`
    );
    if (response.data.status === 'OK') {
      const location = response.data.candidates[0].geometry.location;
      console.log(response.data)
      return { lat: location.lat, lng: location.lng };
    } else {
      return null;
    }
  };


  const Marker = () => <div style={{ color: 'red', fontSize: '32px' }}>📍</div>;

  const renderMarkers = (map, maps) => {
    shelters.forEach(async shelter => {
      const coordinates = await getShelterCoordinates(shelter);
      if (coordinates) {
        new maps.Marker({
          position: coordinates,
          map,
          title: shelter.name,
        });
      }
    });
  };
  
  return (
    <div style={{ height: '700px', width: '100%' }}>
      {error && <div>{error}</div>}
      {location && (
        <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{ key:"AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE" }}
          defaultCenter={location}
          defaultZoom={16}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
        <Marker lat={location.lat} lng={location.lng}></Marker>
        </GoogleMapReact>
      )}
    </div>
  );
};

export default FindShelter;

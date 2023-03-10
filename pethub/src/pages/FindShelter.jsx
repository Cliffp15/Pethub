import { useState, useEffect, React } from "react";
import axios from "axios";
// import fetchToken from '../api/petFinderToken';

const FindShelter = (props) => {
  const [shelters, setShelters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Get the user's location using the HTML5 Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    // Get a list of shelters from the Petfinder API
    const getShelters = async () => {
      // const token = fetchToken();
      const response = await axios.get(
        "https://api.petfinder.com/v2/organizations",
        {
          headers: {
            Accept: "application/jason",
            "Content-type": "application/jason",
            Authorization: ` Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyRURlcDRuVW5abGRmS21FVUc4ajNZSmxKY01HM2RBbFVaVUE4SUplUkE0QnZiSjR6OSIsImp0aSI6ImJkNjkxYmVkNTFjNzQ3YjU3YTdlZWNiY2Y4ZTc4NzBmOGQ5MDg5YWJjNzkzZjliZjY4N2JkOWQ5NGFlNWFkZDhkNjc2NWU3OTFjYTM4ZDQ1IiwiaWF0IjoxNjc4Mzk1NDYxLCJuYmYiOjE2NzgzOTU0NjEsImV4cCI6MTY3ODM5OTA2MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Li7PLnwyuTd3R74O6ovcRIgH-8pUeUcw9RAzjecsA-IeAJaX71zUiXvtWgHxfAGWp3NnOPzk9GLsF1toGhZiLoTed1VcNmOhqXzH3BcoYEhVn1B2Ss2wfcZkGND6oz8Oc3DM9Nef7UCVkh35sKsnV_v_6TeMVnqtiJcG-PRpVzdI0Dtnf88ZnefDZ9CzFqkxp8N0qG4gzsQiYuBSUvauGMIOfhr34hnx_t2yR7Vr_WQ-F6IfvcQ0rBifbj4pxbD2QWR4t0AK4kP13J7owl8uouBSAPAu6uXNc3UUvNMpv047MgwMxz0P8nDsp2iPoPpWL7PyzQJWzSQ_0LdK49x82g`,
          },
          params: {
            location: `${userLocation.lat},${userLocation.lng}`,
            distance: 25,
            limit: 20,
          },
        }
      );
      console.log(response.data);
      setShelters(response.data.organizations);
    };
    if (userLocation) {
      getShelters();
    }
  }, [userLocation]);
  
 
 useEffect(() => {
   if (userLocation) {
     const initMap = () => {
       const map = new window.google.maps.Map(document.getElementById("map"), {
         center: userLocation,
         zoom: 12,
       });
       const marker = new window.google.maps.Marker({
         position: userLocation,
         map: map,
       });
       setMap(map);
       setMarker(marker);

       marker.addListener("click", () => {
        map.panTo(marker.getPosition());
        // map.setZoom(15);
      });
     

     };
     if (window.google) {
       initMap();
     } else {
       const script = document.createElement("script");
       script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
       script.onload = () => initMap();
       document.body.appendChild(script);
     }
   }
 }, [userLocation]);

  function getShelterCoordinates(shelters) {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const markers = [];

      const processShelter = (shelters) => {
        console.log(userLocation);
        const lat = userLocation.lat;
        const lng = userLocation.lng;
        const options = {
          query: shelters,
          fields: ["name", "geometry"],
          locationBias: { radius: 50, center: { lat: lat, lng: lng } },
        };
        service.findPlaceFromQuery(options, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              const marker = new window.google.maps.Marker({
                position: results[i].geometry.location,
                map: map,
              });
              
              marker.addListener("click", () => {
                map.panTo(marker.getPosition());
                // map.setZoom(15);
              });
              markers.push(marker);
              setMarker(marker);
            }
          }
          resolve(markers);
        });
      };

      if (window.google) {
        shelters.forEach((shelters) => processShelter(shelters));
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE`;
        script.onload = () => {
          shelters.forEach((shelters) => processShelter(shelters));
        };
        document.body.appendChild(script);
      }
    });
  }
  const populateShelterMarkers = () => {
    const shelterNames = shelters.map((shelter) => shelter.name);
    getShelterCoordinates(shelterNames);
  };
  return (
    <div style={{ height: "700px", width: "100%" }}>
      {error && <div>{error}</div>}
      {userLocation && (
        <div id="map"  style={{ height: "100%", width: "100%" }}></div>
      )}
      <div>
        <button onClick={populateShelterMarkers}>Locate Shelters</button>
      </div>
      <div>
        <h1>Shelters</h1>
        <ul>
          {shelters.map((shelter) => (
            <li key={shelter.id}>
              <strong>{shelter.name}</strong>
              <br />
              Phone: {shelter.phone}
              <br />
              Distance: {shelter.distance}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

//   const getShelterCoordinates = async shelter => {
//     console.log(shelter.name);
//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
//       {
//         params: {
//           input: shelter.name,
//           inputtype: "textquery",
//           fields: "formatted_address,name,geometry",
//           key: "AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE",
//         },
//       }
//     );
//     if (response.data.status === 'OK') {
//       const location = response.data.candidates[0].geometry.location;
//       console.log(response.data)
//       return { lat: location.lat, lng: location.lng };
//     } else {
//       return null;
//     }
//   };

//   const Marker = () => <div style={{ color: 'red', fontSize: '32px' }}>📍</div>;

//   const renderMarkers = (map, maps) => {
//     shelters.forEach(async shelter => {
//       const coordinates = await getShelterCoordinates(shelter);
//       if (coordinates) {
//         new maps.Marker({
//           position: coordinates,
//           map,
//           title: shelter.name,
//         });
//       }
//     });
//   };

//   return (
//     <div style={{ height: "700px", width: "100%" }}>
//       {error && <div>{error}</div>}
//       {location && (
//         <GoogleMapReact
//           yesIWantToUseGoogleMapApiInternals={true}
//           bootstrapURLKeys={{ key: "AIzaSyBu3k86MKaUazcVMMNdeVmmdQO0pkSA2jE" }}
//           defaultCenter={location}
//           defaultZoom={16}
//           onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
//         >
//           <Marker lat={location.lat} lng={location.lng}></Marker>
//         </GoogleMapReact>
//       )}
//       <div>
//         <button onClick={renderMarkers}>getShelters</button>
//       </div>
//     </div>
//   );
// };
export default FindShelter;

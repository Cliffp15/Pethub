import { useState, useEffect, React } from "react";
import axios from "axios";
import "./styles/Findshelter.css";
import { Divider } from "@chakra-ui/layout";
import Findshelterinfo from "../components/FindShelters";
// import { fetchToken } from "../api/petFinderToken";

const FindShelter = (props) => {
  const [shelters, setShelters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isSheltersVisible, setIsSheltersVisible] = useState(false);
  const [firstcall, setfirstcall] = useState(true);
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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6IjM5Nzc0ZjU2ZThjM2EzZTE5NTI4ODMxZmUzMTFmODNjOWE2NmMzZWFlNmM2ZjBkYmFjYzViZGVkNDQzOWZkMTAwZDkxMWQzYWU3OThkMzQzIiwiaWF0IjoxNjc5NTc3MzYzLCJuYmYiOjE2Nzk1NzczNjMsImV4cCI6MTY3OTU4MDk2Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.n9yiWGyY_Fvn6VJezzwUETLVOJGEc0XiGEhe2MaluYlqtBK6JkN0TLxihaAjxIC5-bEpUFPCVq9N3we_LG2K7K5vpv7fvSamQ3X8GN-Ph7BK6zoh-G41kVo9WIW7ukQ0rreHg0zNjRUj08oejSbPPArBVRNFEKROfuRLXJVhDDNxjnfP9t0685NJymofqfbNqqydZhiZWkuYUlddPBN88PEBuPRhB1gL1Aorod9rVDfBq4Y6QHlcFG6JNkuhxmKb0-LtJdDeQW0_xU1Uunz-Hc0Q0HSsaRQZVlndJg3kfmr2A-oreeRJXt5Tw0V6AL8S6mKeBvjjldXfS94uYpr6Lg`},
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
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            fillColor: "blue", // Set the fill color to red
            fillOpacity: 1,
            strokeWeight: 0,
            scaledSize: new window.google.maps.Size(35, 35), // Set the size of the marker
          },
        });
        setMap(map);
        setMarker(marker);

        const infowindow = new window.google.maps.InfoWindow({
          content: "You",
        });

        marker.addListener("click", () => {
          map.panTo(marker.getPosition());
        });

        marker.addListener("mouseover", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });

        marker.addListener("mouseout", () => {
          infowindow.close({
            anchor: marker,
            map,
          });
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
    } setfirstcall(false);
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
          query: shelters.name,
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

              const infoContent =
                '<div id="content">' +
                "<hi>" +
                shelters.name +
                "</hi>" +
                "<p>" +
                shelters.phone +
                "</p>" +
                "</div>";

              const infowindow = new window.google.maps.InfoWindow({
                content: infoContent,
              });

              marker.addListener("click", () => {
                map.panTo(marker.getPosition());
                // map.setZoom(15);
                infowindow.open({
                  anchor: marker,
                  map,
                });
              });

              marker.addListener("center_changed", () => {
                infowindow.close({
                  anchor: marker,
                  map,
                });
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
    const shelterNames = shelters.map((shelter) => shelter);
    getShelterCoordinates(shelterNames);
  };

  useEffect(() => {
    if(firstcall){
      populateShelterMarkers();
      setIsSheltersVisible(true);}
  }, [firstcall]);

  
  return (

    // style={{ height: "900px", width: "100%" }}
    <div className= "FindShelter-page-container" >
        {error && <div>{error}</div>}
        {userLocation && (
          // style={{ height: "400px", width: "100%" }}
          <div className= "Map-area"id="map"> </div>
        )}
      <div className="page-flex">
        <div className="ShelterSearch-area">
          <div className="Shelter-title">
            <h1>Shelters Near You</h1>
              <div className="Searchbutton-area">
                <button onClick={()=>{
                  populateShelterMarkers();
                  setIsSheltersVisible(true)
                }}>
                  Highlight Shelter Locations
                </button>
              </div>
          </div>
            <div className="Shelterresults-area">
              {shelters.map((shelterinfo, index) => (
                <Findshelterinfo key={index} shelterinfo={shelterinfo}/>
              ))}
            </div>
        </div>
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

import React, { useEffect, useRef, useState } from "react";

const GoogleMap = ({ placeName }) => {
  const [place, setPlace] = useState('India');
  const googleMapRef = useRef();
  let googleMap;

  //Load the google map script on component load
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      getLatLng(); // after the script is loaded get Latitude and Longitufr of the place and display marker on map
    });
  }, [])

  // If user changes place in search then recall getLatLng function to move the marker to selected location
  useEffect(() => {
    if (placeName) {
      setPlace(placeName);
      getLatLng(placeName);
    }
  }, [placeName])

  // THis function is used to draw map and set center of the map to selected location's Lat Long.
  const createGoogleMap = (coordinates) => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 16,
      center: {
        lat: coordinates.lat(),
        lng: coordinates.lng(),
      },
      disableDefaultUI: true,
    });
  };

  // This function uses Geocoder API to get Lat Long of the selected place and move the marker to that Lat Long.
  const getLatLng = (placeName = place) => {
    let lat, lng;
    //Make Geocoder API call to get Lat Long of the place.
    new window.google.maps.Geocoder().geocode(
      { address: `${placeName}` },
      function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          // AFter getting the Lat Long, display marker on the map
          createGoogleMap(results[0].geometry.location);
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          new window.google.maps.Marker({
            position: { lat, lng },
            map: googleMap,
            animation: window.google.maps.Animation.DROP,
            title: place,
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ height: 450 ,marginTop:20 }} />
  );
};

export default GoogleMap;
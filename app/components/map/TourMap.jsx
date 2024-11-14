"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "@/public/marker.png";
import RoutingMachine from "./RoutingMachine";
import SearchControll from "./SearchControll";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import AddLocationDetails from "./AddLocationDetails";
import { useMapContext } from "@/app/components/dashboard/createTour/MapContext";
import SelectedLocation from "./SelectedLocation";

const customIcon = new L.Icon({
  iconUrl: markerIcon?.src, // Replace with your icon path
  iconSize: [46, 46], // Size of the icon
  iconAnchor: [20, 35], // Anchor the icon at its bottom center
  popupAnchor: [0, -46], // Adjust popup position if using popups
});

const TourMap = ({ locations, pageType }) => {
  // the map state for location
  const contextData = pageType === "admin" && useMapContext();

  const selectedLocation =
    pageType === "admin" ? contextData?.state?.selectedLocation : locations;

  const defaultPosition = [
    locations[0].coordinates[1],
    locations[0].coordinates[0],
  ];
  // the position of the marker and popup
  const [position, setPosition] = useState(null);

  // address of selected point getting by reverseGeoCoding
  const [address, setAddress] = useState("");

  const markerRef = useRef(null);

  const reverseGeoCode = async function (lat, lng) {
    const provider = new OpenStreetMapProvider();
    const result = await provider.search({ query: `${lat},${lng}` });
    if (result && result.length > 0) {
      setAddress(result[0].label);
    } else {
      setAddress("no address found");
    }
  };

  const LocationMarkerGeoCoded = () => {
    const dispatch = contextData?.dispatch;

    useMapEvents({
      click(e) {
        // checking it clicked on the map only not on the overlay elements
        if (e.originalEvent.target !== e.sourceTarget.getContainer()) return;
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeoCode(lat, lng);
      },
    });

    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.togglePopup();
      }
    }, [position]);

    const cancelMarker = function (e) {
      e.stopPropagation();
      setPosition(null);
    };

    return position ? (
      <Marker ref={markerRef} icon={customIcon} position={position}>
        <Popup minWidth={250} className="p-0">
          <AddLocationDetails
            address={address}
            setPosition={setPosition}
            position={position}
            cancelMaker={cancelMarker}
          />
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <>
      <div className=" relative">
        <MapContainer
          center={defaultPosition}
          zoom={15}
          maxZoom={18}
          minZoom={7}
          style={{ height: "550px", width: "100%" }}
        >
          <TileLayer
            url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=5a1f7bce059b4f25aec08e4a8a50524c"
            attribution="&copy; Stamen Design, &copy; OpenStreetMap contributors"
          />
          {selectedLocation &&
            selectedLocation?.map((item, index) => (
              <Marker
                key={index}
                position={[item?.coordinates[1], item?.coordinates[0]]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3>{item?.address}</h3>
                  </div>
                </Popup>
              </Marker>
            ))}
          <div className=" absolute bottom-1 left-2 z-[999] pointer-events-none">
            <SelectedLocation
              places={
                pageType === "admin"
                  ? contextData?.state?.selectedLocation
                  : selectedLocation
              }
              pageType={pageType}
            />
          </div>

          <RoutingMachine locations={selectedLocation} />
          {pageType === "admin" && <SearchControll />}
          {pageType === "admin" && <LocationMarkerGeoCoded />}
        </MapContainer>
      </div>
    </>
  );
};

export default TourMap;

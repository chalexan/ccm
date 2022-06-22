import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import { latLngBounds } from "leaflet";
import "./map.css";
import "leaflet/dist/leaflet.css";
import convert from "geo-coordinates-parser";
import L from "leaflet";
import { Divider } from "antd";
var json = require("../data/kadastr_karabi.json");

const DevicesPage = () => {
  const position = [44.873, 34.575];
  // {lat: 45.20072775203464, lng: 34.092893600463874}
  const defaultBounds = [
    [44.745197, 33.367692],
    [33.862273, 45.209966],
  ];

  const Red_MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36.059" height="36.059" viewBox="0 0 36.059 36.059" style="transform:rotate(${0}deg)">
    <defs>
      <filter id="Path_10080" x="0" y="0" width="36.059" height="36.059" filterUnits="userSpaceOnUse">
        <feOffset input="SourceAlpha"/>
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feFlood flood-opacity="0.161"/>
        <feComposite operator="in" in2="blur"/>
        <feComposite in="SourceGraphic"/>
      </filter>
    </defs>
    <g id="Group_8038" data-name="Group 8038" transform="translate(5719.5 1106.5)">
      <rect id="Rectangle_2670" data-name="Rectangle 2670" width="21" height="21" transform="translate(-5712 -1099)" fill="none"/>
      <g transform="matrix(1, 0, 0, 1, -5719.5, -1106.5)" filter="url(#Path_10080)">
        <path id="Path_10080-2" data-name="Path 10080" d="M15.4,12.766a6.414,6.414,0,0,0,1.781-5.634l-.446-2.55-2.55-.446A6.414,6.414,0,0,0,8.553,5.916L6.746,7.723c.234-.232-.845.866-.626.626l-2.96,2.96a2.644,2.644,0,0,0,0,3.735l3.114,3.114a2.644,2.644,0,0,0,3.735,0l2.96-2.96Z" transform="translate(19.2 2.96) rotate(45)" fill="${"red"}"/>
      </g>
    </g>
  </svg>
  `)}`;

  const BoatIcon = L.icon({
    iconUrl: Red_MARKER,
    iconSize: [30, 30],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  return (
    <>
      <Map
        className="simpleMap"
        //  bounds={defaultBounds}
        // boundsOptions={{ padding: [50, 50] }}
        center={position}
        zoom={11}
        key={0}
        onclick={(event) => console.log(event.latlng)}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {json.map((el) => (
          <Marker
            icon={BoatIcon}
            position={[
              convert(el.location).decimalLatitude,
              convert(el.location).decimalLongitude,
            ]}
          >
            <Popup>
              <b>Пещера {el.cave_name} </b>
              <br />
              Амплитуда: {el.deep}
              <br />
              Протяженность: {el.length}
              <br />
              Высота входа: {el.alt_entrance ? el.alt_entrance : "?"}
              <br />
              Координаты: {el.location}
            </Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
};

export default DevicesPage;

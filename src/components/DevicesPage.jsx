import { Map, TileLayer, GeoJSON, Marker } from "react-leaflet";
import { latLngBounds } from "leaflet";
import "./map.css";
import "leaflet/dist/leaflet.css";
const DevicesPage = () => {
  const position = [45.2, 34.092];
  // {lat: 45.20072775203464, lng: 34.092893600463874}
  const defaultBounds = [
    [44.745197, 33.367692],
    [33.862273, 45.209966],
  ];
  return (
    <Map
      className="simpleMap"
      //  bounds={defaultBounds}
      // boundsOptions={{ padding: [50, 50] }}
      center={position}
      zoom={8}
      key={0}
      onclick={(event) => console.log(event.latlng)}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

export default DevicesPage;

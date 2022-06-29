import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import { latLngBounds } from "leaflet";
import { useGeolocated } from "react-geolocated";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./map.css";
import "leaflet/dist/leaflet.css";
import convert from "geo-coordinates-parser";
import L from "leaflet";
import { Divider } from "antd";
import { useState, useEffect } from "react";
var json = require("../data/kadastr_karabi.json");

const DevicesPage = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [myGeo, setMyGeo] = useState([]);
  const position = [44.873, 34.575];
  // {lat: 45.20072775203464, lng: 34.092893600463874}
  const defaultBounds = [
    [44.745197, 33.367692],
    [33.862273, 45.209966],
  ];

  useEffect(() => {
    !isGeolocationAvailable
      ? console.log("Your browser does not support Geolocation")
      : !isGeolocationEnabled
      ? console.log("Geolocation is not enabled")
      : coords
      ? setMyGeo([coords.latitude, coords.longitude])
      : //console.log("latitude", coords.latitude, "longitude", coords.longitude)
        console.log("Getting the location data");
  }, [coords]);

  const EasyCaveIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAADv0lEQVRIia2VS2wbVRSG/7nz9Dzs8cw4dmPHsR0/0gRSKw/atJFSoaiPiKQCNUGIdsGiRUiAhMSSRVZVA6SquoI1G2RgQxGwKGLTNrhNUpAKizZSStUEImrH2DVJnHiGlV2cGYIjcXf33P8/3z3naO4Ae1gvfJAdHJv54dBePKRZ4akrt8a6Y74vO8O+q6cu3Rpr1sc0K3TzwtRwT8QAgN9y5SkAV5vxNVXB6HS2P9GmtYMCQAHJkDc6Op3t/98AqsK/2xX26bV9V7TFqyrCO814HVv04pWFAzJHnev4Pf02ADwSfkmLAls/F3kWIs/2TWQy9GeTk9U9AzSRuTzc5TuYKc99DQBH28PBnZpUWAvd+Cl6DMA3uwFsLZrIZGhNYoO9Md2lK9wZj8S9lQhq8k5dMmxIosS9uVtyR8Dmw8iR7jY1IAkMZI4845aEBMvQNiNLE3gkvnNsak7cDWBrkVdhz/ZEvAoABA2pjeNlCQDuP3qM1cdFWAACuhuJNgPdsZbQar70yvjlbNF8Ur351XuHl/+zAhfH9HplDgAw0KGpFkx2rbSOUrGMcyMxnB+JoVQqY620jojfwykif+HMUOyTcMj9/fFLN7VdAWMfzhmtXldLbR/1K8gVyli4t4LTg6G67vRgCAv3VlAobWB/q2IMxHX+tedj8RaXOLMrwEVb430xI1Db04SCaVYxlNTAs0/nwLM0hpIavs3ex7H0PgIAhlugdDd3eCKTaRhYwwxkmZtMtMoNsZcOBuFXXTsvhnTUi9XiBmrtBIC+qNa6OBs5CuA7ewWWRXlErp1lGsfilLy2jh/Y1wiNabIh86//M1bPdvLibDoVdPv+Ldl6pYq5xRzmF3PYqDh/vLLAQBHoZ2FZlA1gaOLZdETVnYwr+XV8fO0Bfs4R3M0RfHTtAVby646Qnqg3cGLmdv0hrANEjj7i1I6qaeHz7DJS8QgCuoqAriIVj+CL7DKqpmXT93foql/m3mgAjE9fV3yK4He60Z2lNaiaDkKezoYQAlXT8ePSmk2vShwknjzXAKB54URvXA3Y1ADmlwrweT22uOH1YH6p4GRBKqT6R6Zn99cBqsS+2tmq8k7iqklACGWLE0Khajn/Tg4lDSPoEc7XATLPxF2c/UHb2jZhEXu8tkwQbG2btniLR4CLY4cBgBm9kE2qEhv89Y+yTZh/sonNyjYKRfsZAGxuVXH34Z/QFM525pGY8MjF62Hq5Ps3Ovwe+WWnBFUTYmXbGqAohx4BsCzT4hjqNk3wl706YCVf+fRvcrb3/xXPOzcAAAAASUVORK5CYII=",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  const myGeoIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAEw0lEQVRIia2VW2yTZRjHf+/39bRu7dp17VbY1g6BxW2AwDCDXQA6kSAhAQGjICAITGOEGxX1QjR6YTTEEOMBvUBQDCISCDGIGA5RAgMBF52UjdMO7diBHdr1sLbf60WXQWFTTHgu3/f//H/Pe3peuC2k318km5tfklKq3KcQaYBAwEki8SdQDywXhYWt9xUAIJub5wI/Ar0Isa7Q0vRLMmqcpwlpV4U87HdO8wHI+mtuVOU5EqatoswVumfAIOQjYMNxZYC1apcWRigF3RE6swzxkEn3YluXswchPgVyQa4UJZ4d/w/Q0GDs0cd9D2dEPLpIjN0fn6K0tZegScfZmrn91ba8TFpvQIYRLMoXorx83UgAZdjR8yuU/YF91qCQ1By5TGlrLwBWp4NqW14m0Rgkk5Bjg1hg/EjmALq0yreONWK1lidjiQ/35oy1A8zydaTmBGjTy1AkoCiQ7wQgGfpr2F0YfgXZ2TtQxNl3xy+adcb+AGUtvZS29qWEpV70pcWpTTXowaAnmYhzOH79IbljYua9ATTLypOx8q+3eauZebGd7z6rRUgJqoKYOeWu5Mhv55LbCiqtoH/zngCN702QvhPlj+uTko37fVjCccixoix9BOGyp2pIakN6cxTVG7BxwF2xSX41ZeF/ArotpsoH6zudxXU3oy9UTCT5xgrUl5cgSjwA1J+8wL5PviEWjgIgXHZeP3iRzeOWipYMx265s2LBvwIkol/R5Gd9LcqeYqnDpKamG87/zcEvd3Ol/hIV1TMwmk0pQJmXnN4IH3zbyLIpG/TNxpzv5c6pT9zuOdRz5IUtC0fPN9cVvPPWHveCZ13TbOb5j+VaAXC4nbi9hbjHFDLKWwBi8OKoKsKgMvp0A7p+hZo5C1VvuGPxrkfVg2/v97elr0ARkzHqRgGce37O56sLHHtvr8SSk02u23XLHEBKRL4DwzPVLKttZskhP2snrzdsmvD0oc1yswKDL1keXWUTs7f3DOX5/WaCiStA3nAHNxQ3e0FRwZZF389HSdQ2MW9RJU2Vdib1Xdt2aPzi9Yr8dfUoVO2YPLFq41DiH9cP47uWR6j/llkoDN2DPS0ag9Z2iMXBlgWAtWo62fEEy39vJrMxQl120Rq3/5xHIa7dRAgfUtQByGNnl9DTV0UoApeaYPDG0Nadglz1QzAMrhxw594qwGwCRZUzOrrJvBJFSkVFl1yuE7O3R4GnhoTByBYkMJCAQBc47FCUnzIuKQJPfqpV3BlJDbSk8MRiKHGJ2p8kYVEn3qWM9kQGAFAF5DsgGaex9hSvTHUQ8riGNwfoDgJgMOoBUOISEGqaunbSa2V1W454omcuIbs7wPITbcH3+WFMLmvaE2S19w5vDshAqilmeN2YVZVkhkCg+dK6qaZoT5qNqqpv60SaTyPsQWz6lbzaFE8JMqMjA250g05FrZpAVSTK5QwVqXEgDSAQbt3g0xNZVlCXYtKMaYqRQpk0DlnsRrjslAwEgejxG/lTT6cBEOJqPCHBoEeMngsY011MhhEBOG0Ipw0Ar9mYUJRIDdz54STkroiU9qDRPD071B8WpiY3gAQN0EQ4ZpZtAZ1QCWJIdKYBjLYuzVjYElA0m1koHf7ciosA/wCcUs3KqtmBiwAAAABJRU5ErkJggg==",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  const SuperCaveIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACEElEQVRIie2UTWsTURSGnzOZyUdjENJW2kqluNGF4EZFxGJJbcSqiNGAVAXRP6BLtUK3rvwJ3boprv0BglC3xha/cKERSdNG8z0f18U0cZxM7JR22bO773nPfc49987AXuxmVOd5VHvC/HZqJKxRLRCvW3wTMJom4+lnVMLUaWEBNZM8kFaQihvcDVv3X8DKzNDYanbwKIBo5Du6glu7AsCW58rWXqiHJFBkPJkTjQUO7Qiwmhk8iJADjhdLqQdA0pMWZXFtRwBH5CagA7R+R+735CEH8DGbHl+ZHn79ZWoivi0A8nfm7apxWNniS3O29phR09KfAmdaem0uNOD91MiEKDnVWSuFNNajKFuo/ew2qrUb+pyIuu2auBP+BJpzA9830liLsfE1SflTiuqPhKuV4veAxKZl8sPFkeFQAPGMpxPNjSj1ktt9teju2awYRzyWiNOyrm4JKFwYGgV10q87juBs3oPZjFBfi9Gu6RGvR4nktgRolswS4hey/nlfkJx5e2VswCvovR51OWj/N3WDpYo7ouv7m5weMIMAsWTDmgRedRv2Zt/liYJM+6uW6waL5QQVW6jYwmI5wXLdCAKgKWb+WXsXUj5wDkh5NUsJL3/FUN4zAkuVGJZX7OZUti9AQ13yFxRaOiWr97GVbY1CM2DCcMx9KAEAYNbv/m72v+9iABiQiKmd71u0F/74AxFnpcyCh3MZAAAAAElFTkSuQmCC",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  const CustomCaveIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAADwUlEQVRIia2UzW8bRRjGn5nZnf3y7tq79tpO7MRJkzht1YRGhLaAkIoTI6sS/ZAqVAlRofaAOCC4AGlAsrhw4xDUphHlBBIS/0BEgQMHRM+NokTqR5paQZXiJCQ0mNiOh0NpEsfbQKLMbd55nvnNs/PuALsYN/KvOdc+PhXajYf+X+H1ocwhAjGtKJXpsaFs974DJC6N9XUEw0c7bY8puLGvgKvD2aQik7QdkEkwwKFItOvqcDa5bwDOcKnV0za+faunhTipXdoz4OsPXzJHhwfPCoAAAKW4GHVV6el6zNUkyujFPQNoIPiZFdC+G/0ke/ralUyPqUqGzDalEiMwNcn48tOBI3sCAOL1F57rVHTO31S59E4ypoW3K1qiWlin5N1dA766komqKg/EvRAEqb0oBM5GLIUAQKVaQ6VaAwBEgiqBIGfy+fyO9yhtLwjQXFsiahJCEDINrVJeJZQS/L6whrmFMgAg4XDEwwpcmytr87+9Ojo8aMoy/eVy/ofF/0zANeVCc8zRAKA1EbF1VbZLazUUimXkTvYjd7IfDxfKKK3VkPD0kKbTb7va4t9Qym59nz/PdwQ8iSt6HdsAADTHXFIqC0wVVnHsaBcYo2CM4lhfGlOFVTACBK1A5Hhf2uhub/KWqssNrVsHiFV+7Qs7FgMhAABDV1EuC9imhWh48wmKukHYlomJmT/RczBFASB9IGFzLr2/I4DL7FwqEXa31jra4ni+t3O7D/29XZAVBdGwDQBQFRmGpoTGPhpoeSaAMnamKeqSrbXD6VZw3tALkGUJgy/3gJBN+YFUPCjp0hu+gJF8zpJlyVW43LDZs4amKnXzVHNEZpS+tbW2cTReXc8mm8K630Y1IfDzzQlMT84BALoPNyOTPQJK6sJCVTk4597IUC7y3ufj83UJdE2+0BJ3A36Am+O3UbhXRDLiIBlxULhbxI/jt31TtSc9S2HVc0/nG4D1mjjhOlaDYWWlhPt3HsE1DRA8ef0cy8C9O4+wslJq0KeSUVVV+Nt1gOtDmUMhO8C2RwaAyYkCdF7//xAAuswxOVFo0JuGCspo+0g+Z20AJFU+nUp4jl/k2Zl5GNsuEwAMVcHsTNHPglTC03mlemoTQOn5Ji/U2IsAlhZXwSXWUJdlhqXFx76AtqRnaKpyGQDIFx+c0AzDLCabw3/5iW/9dNe1A5oQEBDrgggCQQkhhBCx/LhEjg90LPj5Hs4V9fIycyQAWK/ilQez/nEVSzr4NyoAAMFqgtSIACH03zU8mC1O+RoBVKU/6D9GsOoJhFP+cgAAAABJRU5ErkJggg==",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  return (
    <div key={coords}>
      <Map
        className="simpleMap"
        //  bounds={defaultBounds}
        // boundsOptions={{ padding: [50, 50] }}
        center={position}
        zoom={11}
        key={0}
        onclick={(event) => console.log(event.latlng)}
      >
        {console.log()}
        <TileLayer
          attribution={myGeo[0] + " " + myGeo[1]}
          className="basemap"
          maxNativeZoom={19}
          maxZoom={19}
          subdomains={["clarity"]}
          url="https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {myGeo.length > 0 && <Marker icon={myGeoIcon} position={myGeo} />}

        {json.map((el) => (
          <Marker
            icon={
              el.deep < 25
                ? EasyCaveIcon
                : el.deep > 90
                ? SuperCaveIcon
                : CustomCaveIcon
            }
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
    </div>
  );
};

export default DevicesPage;

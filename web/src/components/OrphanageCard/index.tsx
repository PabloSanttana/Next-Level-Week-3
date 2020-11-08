import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import "./styles.css";
import mapIcon from "../../utils/mapIcon";
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanageCard({
  id,
  name,
  latitude,
  longitude,
}: CardProps) {
  return (
    <div className="orphanageCard__container">
      <div className="orphanageCard__map-container">
        <Map
          interactive={false}
          center={[latitude, longitude]}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          zoom={16}
          style={{ width: "100%", height: 280, borderRadius: 20 }}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            interactive={false}
            icon={mapIcon}
            position={[latitude, longitude]}
          />
        </Map>

        <footer>
          <span className="orphanageCard__span">{name}</span>

          <div className="orphanageCard__group__actions">
            <Link to={`/app/Dashboard/edit/${id}`}>
              <FiEdit3 color="#15C3D6" size={24} />
            </Link>
            <Link to={`/app/Dashboard/delete/${id}`}>
              <AiOutlineDelete color="#15C3D6" size={24} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

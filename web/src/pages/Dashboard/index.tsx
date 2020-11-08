import React, { useState, useEffect } from "react";
import Siderbar from "../../components/Siderbar";

import "./styles.css";
import OrphanagesCard from "../../components/OrphanageCard";
import api from "../../services/api";
import notFound from "../../images/notfound.png";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function Dashboard() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  async function getOrphanges() {
    const response = await api.get("users/orphanages");
    setOrphanages(response.data);
  }
  useEffect(() => {
    getOrphanges();
  }, []);

  return (
    <div className="dashboard__container">
      <Siderbar isAuthenticated={true} dashboard={true} />

      <div className="dashboard__content">
        <div className="dashboard__content__info">
          <h1 className="dashboard__content__info__title">
            Orfanatos Cadastrados
          </h1>
          {orphanages.length > 0 && (
            <span className="dashboard__content__info__name">
              {" "}
              {orphanages.length} Orfanatos
            </span>
          )}
        </div>
        {orphanages.length > 0 ? (
          <ul className="dashboard__content__listCard">
            {orphanages.map((orphanage, index) => {
              return (
                <li key={index}>
                  <OrphanagesCard
                    id={orphanage.id}
                    latitude={orphanage.latitude}
                    longitude={orphanage.longitude}
                    name={orphanage.name}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="dashboard__content__listCard">
            <img src={notFound} alt="Nehum no momento" />
          </div>
        )}
      </div>
    </div>
  );
}

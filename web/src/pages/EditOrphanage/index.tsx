import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Marker, Map, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useHistory, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import Siderbar from "../../components/Siderbar";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";

interface Orphanage {
  data: {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
      url: string;
    }>;
  };
}
interface OrphanageParams {
  id: string;
}

function EditOrphanage() {
  const { id } = useParams<OrphanageParams>();
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpening_hours] = useState("");
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    async function getOrphange() {
      const response: Orphanage = await api.get(`orphanages/${id}`);
      setPosition({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      });
      setName(response.data.name);
      setAbout(response.data.about);
      setInstructions(response.data.instructions);
      setOpening_hours(response.data.opening_hours);
      setOpen_on_weekends(Boolean(response.data.open_on_weekends));
    }
    getOrphange();
  }, [id]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach((image) => {
      data.append("images", image);
    });

    api
      .put(`/orphanages/${id}`, data)
      .then((response) => {
        alert("Cadastro com sucesso");
        history.push("/app/Dashboard");
      })
      .catch((error) => {
        return alert("Erro no cadastro, tente novamante");
      });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }
  function handleDeleteImages(id: number) {
    images.splice(id, 1);
    previewImages.splice(id, 1);
    setImages([...images]);
    setPreviewImages([...previewImages]);
  }
  return (
    <div id="page-create-orphanage">
      <Siderbar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[position.latitude, position.longitude]}
              zoom={15}
              style={{
                width: "100%",
                height: 280,
              }}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {position.latitude !== 0 && (
                <Marker
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                ></Marker>
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={index} style={{ position: "relative" }}>
                      <img src={image} alt={name} />
                      <div
                        style={{
                          position: "absolute",
                          background: "#ffff",
                          top: "0px",
                          right: "0px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "2px",
                          borderRadius: "20px",
                        }}
                      >
                        <TiDelete
                          color="#c91f1f"
                          fontSize={30}
                          onClick={() => handleDeleteImages(index)}
                        />
                      </div>
                    </div>
                  );
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funciomaneto</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpening_hours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  onClick={() => setOpen_on_weekends(true)}
                  className={open_on_weekends ? "active" : ""}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={open_on_weekends ? "" : "active"}
                  onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditOrphanage;

import React from "react";

import "./styles.css";
import DeleteImg from "../../images/Delete.svg";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/api";

interface OrphanageParams {
  id: string;
}

export default function Delete() {
  const { id } = useParams<OrphanageParams>();
  const history = useHistory();

  function handleDeleteOrphanage() {
    api
      .delete(`orphanages/${id}`)
      .then((response) => {
        alert("Delete com sucesso!");
        history.goBack();
      })
      .catch((error) => {
        alert("Não permitido ou não encontrado, tente novamente");
      });
  }

  return (
    <div className="deleteOrphanage__container">
      <div className="deleteOrphanage__content">
        <div className="deleteOrphanage__info">
          <h1 className="deleteOrphanage__info__title">Excluir!</h1>
          <span className="deleteOrphanage__info__span">
            Você tem certeza que quer
          </span>
          <span className="deleteOrphanage__info__span">
            excluir Orf. Esperança?
          </span>
          <button
            className="deleteOrphanage__buttonDelete"
            onClick={handleDeleteOrphanage}
          >
            deletar
          </button>
        </div>
        <img className="deleteOrphanage__img" src={DeleteImg} alt="" />
      </div>
      <button className="deleteOrphanage__cancel" onClick={history.goBack}>
        voltar
      </button>
    </div>
  );
}

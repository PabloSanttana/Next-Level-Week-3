import React, { useState, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";

import "./styles.css";
import logo from "../../images/map-marker.svg";
import api from "../../services/api";
import { authLOGIN } from "../../store/actions";

interface User {
  name: string;
  email: string;
  token: string;
}

export default function RegisterUser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email === "" || email === undefined) {
      return alert("E-mail é obrigatório");
    }
    if (password === "" || password === undefined) {
      return alert("Senha é obrigatório");
    }
    if (!validateEmail(email)) {
      return alert("E-mail invalido");
    }
    if (!(passwordConfirm === password)) {
      return alert("Senhas diferentes");
    }

    const data = {
      email,
      password,
      name,
    };

    api
      .post("/users", data)
      .then((response) => {
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;

        dispatch(authLOGIN(response.data));
        history.push("/app/Dashboard");
      })
      .catch((error) => {
        alert("Ops... error senha ou email invalido");
      });
  }

  function validateEmail(email: string) {
    var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="login__container">
      <div className="login__containerLeft">
        <div className="login__Left__content">
          <img src={logo} alt="logo" />
          <h1>Happy</h1>
          <strong>Rio Grande do Norte</strong> <br />
          <span>Natal</span>
        </div>
      </div>
      <div className="login__containerRigth">
        <div className="login__rigth__content">
          <Link to="/" className="login__goback">
            <FiArrowLeft size={25} color="#15C3D6" />
          </Link>

          <h2>Fazer login</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputText"
              type="text"
            />
            <label htmlFor="">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputText"
              type="text"
            />
            <label htmlFor="">Senha</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputText"
              type="password"
            />
            <label htmlFor="">Confirme Senha</label>
            <input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="inputText"
              type="password"
            />

            <button type="submit">Cadastra-se</button>
          </form>
        </div>
      </div>
    </div>
  );
}

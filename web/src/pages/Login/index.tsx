import React, { useState, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import logo from "../../images/map-marker.svg";
import api from "../../services/api";
import { authLOGIN } from "../../store/actions";
import { Store } from "../../utils/interfaceReducers";

interface User {
  name: string;
  email: string;
  token: string;
}

export default function Login() {
  const isAuthenticated = useSelector(
    (state: Store) => state.auth.isAuthenticated
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCheck, setSelectedCheck] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      return history.push("/app/Dashboard");
    }
    const emailSave = localStorage.getItem("email");
    if (!emailSave) return;

    setEmail(emailSave);
  }, []);

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

    const data = {
      email,
      password,
    };

    api
      .post("/login", data)
      .then((response) => {
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        if (selectedCheck) {
          localStorage.setItem("email", email);
        }
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

            <div className="login__formgroup">
              <div>
                <input
                  type="checkbox"
                  value="true"
                  onChange={(e) => setSelectedCheck(!selectedCheck)}
                  name="Lembrar-me"
                />
                <label>Lembrar-me</label>
              </div>

              <Link to="/app/users/register">Cadastre-se</Link>
            </div>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

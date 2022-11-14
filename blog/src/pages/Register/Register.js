import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDsplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  // desempacota os dados do Hook 
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpa os error após o submit
    setError("");

    // cria um objeto user com os dados do form
    const user = {
      displayName,
      email,
      password,
    };

    // Valida se as senhas são iguais
    if (password !== confirmPassword) {
      setError("As senhas precisão ser iguais!");
      return;
    }

    const res = await createUser(user);
  };

  // Monitora a váriavel authErro, para verificar se vêm algum erro do Backend
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar!</h1>
      <p>Crie seu usuário e compartilhe suas Histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDsplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirme a Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading ? (
          <button className="btn">Cadastrar</button>
        ) : (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error ? <p className="error">{error}</p> : null}
      </form>
    </div>
  );
};

export default Register;

import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sigInWithEmailAndPassword,
  updateProfile,
  singOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentification = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Limpeza de dados
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Registrar o usuário
  const createUser = async (data) => {
    checkIfIsCancelled();

    // Inicia o estado de Load
    setLoading(true);
    // Seta os error para null
    setError(null);

    // Inicia a tentativa de criação do usuário
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A Senha precisa ter mais de 6 Caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading };
};

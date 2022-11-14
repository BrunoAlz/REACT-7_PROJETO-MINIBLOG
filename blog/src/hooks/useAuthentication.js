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
};

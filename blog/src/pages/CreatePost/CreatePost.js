import styles from "./CreatePost.module.css";

import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Valida a URL da Imagem

    // Cria o Array de TAGS

    // Check todos os valores

    // Inserir dados no Firebase
    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect para home page
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Postagem!</h2>
      <p>
        Escreva sobre o que quiser compartilhar e comppartilhe o seu
        conhecimento!
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Insira um título</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insira um titulo"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Insira a URL ad Imagem</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira a URL da Imagem!"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Descrição da postagem</span>
          <textarea
            name="body"
            required
            placeholder="Descreva o que você está pensando"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as TAGS separadas por (Virgulas)!"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading ? (
          <button className="btn">Cadastrar</button>
        ) : (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error ? <p className="error">{response.error}</p> : null}
      </form>
    </div>
  );
};

export default CreatePost;

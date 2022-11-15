import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
        {/* {!loading ? (
          <button className="btn">Cadastrar</button>
        ) : (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error ? <p className="error">{error}</p> : null} */}
        <button className="btn">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

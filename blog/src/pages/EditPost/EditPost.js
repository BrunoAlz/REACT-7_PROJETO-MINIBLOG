import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(",");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Valida a URL da Imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A Imagem não possui uma URL Válida!");
    }

    // Cria o Array de TAGS
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Check todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, Preencha todos os campos!");
    }

    if (formError) return;

    // Inserir dados no Firebase
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect para home page
    navigate("/");
  };

  return (
    <div className={styles.edit_post}>
      <h2>Editar Postagem!</h2>
      {post && (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
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
              <span>URL da Imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira a URL da Imagem!"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da Imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
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
              <button className="btn">Editar</button>
            ) : (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error ? <p className="error">{response.error}</p> : null}
            {formError ? <p className="error">{formError}</p> : null}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;

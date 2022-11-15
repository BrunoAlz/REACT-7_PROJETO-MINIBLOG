// CSS
import styles from "./Home.module.css";

// Hooks
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetails from "../../components/PostDetails";

// Components

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>Postagem recentes!</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar postagem..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading ? <p>Carregando posts...</p> : null}
        <h1>Posts..</h1>
        {posts && posts.map((post) => <PostDetails key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados Posts..</p>
            <Link to="posts/create" className="btn">
              Criar Primeiro Post!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

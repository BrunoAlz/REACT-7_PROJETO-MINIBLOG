import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const posts = [];

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar Primeiro post
          </Link>
        </div>
      ) : (
        <div>
          <p>Tem post</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

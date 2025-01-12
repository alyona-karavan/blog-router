import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../services/api/articles";
import styles from "./Articles.module.scss";
// import Article from '../Article';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles(currentPage);
        //TODO remove
        console.log("API Response (Article):", data);
        if (data && Array.isArray(data)) {
          setArticles(data);
        } else {
          setError("No articles found or invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articles || articles.length === 0) return <div>No articles found</div>;

  return (
    <section className={styles.articles}>
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <section className={styles.article}>
            <div className={styles.leftSide}>
              <div className={styles.titleLikes}>
                <Link
                  to={`/articles/${article.slug}`}
                  key={article.slug}
                  className={styles.title}
                >
                  {article.title}
                  {/* <Article article={article} /> */}
                </Link>
                <img
                  className={styles.heart}
                  src="/assets/img/heart.svg"
                  alt="like"
                />
                {/* !!!!!!! */}
                {article.favoritesCount !== 0 && (
                  <p className={styles.countLikes}>{article.favoritesCount}</p>
                )}
              </div>
              {article.tagList && article.tagList.length > 0 && (
                <p className={styles.tagList}>
                  {article.tagList.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </p>
              )}
              {/* /!!!/ */}
              <p className={styles.description}>{article.description}</p>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.containerForAuthorDate}>
                <p className={styles.author}>{article.author.username}</p>
                {article.updatedAt ? (
                  <p className={styles.date}>
                    {new Date(article.updatedAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                ) : (
                  <p className={styles.date}>
                    {new Date(article.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <img
                src={article.author.image}
                alt="Profile"
                className={styles.photo}
              />
            </div>
          </section>
        ))
      ) : (
        <div>No articles found</div>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={articles && articles.length < 10}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Articles;

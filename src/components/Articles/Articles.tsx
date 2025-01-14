import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../services/api/articles";
import styles from "./Articles.module.scss";
import { TArticle } from "../../services/types/types";
import PaginationComponent from "../PaginationComponent";
import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";

const Articles = () => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0); 

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const { articles, articlesCount } = await fetchArticles(currentPage); 
        if (articles && Array.isArray(articles)) {
          setArticles(articles);
          setTotal(articlesCount); 
        } else {
          setError('No articles found or invalid data format')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [currentPage])

  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;
  if (!articles || articles.length === 0) return <div>No articles found</div>;

  return (
    <>
    <section className={styles.articles}>
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <section className={styles.article} key={article.slug}>
            <div className={styles.leftSide}>
              <div className={styles.titleLikes}>
                <Link to={`/articles/${article.slug}`} key={article.slug} className={styles.title}>
                  {article.title}
                </Link>
                <img className={styles.heart} src="/assets/img/heart.svg" alt="like" />
                {article.favoritesCount !== 0 && <p className={styles.countLikes}>{article.favoritesCount}</p>}
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
              <p className={styles.description}>{article.description}</p>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.containerForAuthorDate}>
                <p className={styles.author}>{article.author.username}</p>
                {article.updatedAt ? (
                  <p className={styles.date}>
                    {new Date(article.updatedAt).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                ) : (
                  <p className={styles.date}>
                    {new Date(article.createdAt).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
              <img src={article.author.image} alt="Profile" className={styles.photo} />
            </div>
          </section>
        ))
      ) : (
        <div>No articles found</div>
      )}
    </section>
    <PaginationComponent
      current={currentPage} 
      total={total} 
      onChange={(page) => setCurrentPage(page)}
    />
    </>
  );
};

export default Articles

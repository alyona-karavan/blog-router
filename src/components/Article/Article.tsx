import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { fetchArticleBySlug } from "../../services/api/articles";
import styles from "./Article.module.scss";
import { TArticle } from "../../services/types/types";

const Article = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentArticle, setCurrentArticle] = useState<TArticle | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setError("Slug is undefined");
        return;
      }
      try {
        setLoading(true);
        const data = await fetchArticleBySlug(slug);
        if (data) {
          setCurrentArticle(data);
        } else {
          setError("Article not found");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  

  return (
    <section>
      {currentArticle && (
        <div className={styles.container}>
        <div className={styles.article}>
      <div className={styles.leftSide}>
        <div className={styles.titleLikes}>
          <p className={styles.title}>{currentArticle.title}</p>
          <img
            className={styles.heart}
            src="/assets/img/heart.svg"
            alt="like"
          />
          {currentArticle.favoritesCount !== 0 && (
            <p className={styles.countLikes}>{currentArticle.favoritesCount}</p>
          )}
        </div>
        {currentArticle.tagList && currentArticle.tagList.length > 0 && (
          <p className={styles.tagList}>
            {currentArticle.tagList.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </p>
        )}
        <p className={styles.description}>{currentArticle.description}</p>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.containerForAuthorDate}>
          <p className={styles.author}>{currentArticle.author.username}</p>
          {currentArticle.updatedAt ? (
            <p className={styles.date}>
              {new Date(currentArticle.updatedAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          ) : (
            <p className={styles.date}>
              {new Date(currentArticle.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <img
          src={currentArticle.author.image}
          alt="ProfilePhoto"
          className={styles.photo}
        />
      </div>
          </div>
      <ReactMarkdown className={styles.body}>{currentArticle.body}</ReactMarkdown>
      </div>
    )}
    </section>
  );
};

export default Article;

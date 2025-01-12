import React, { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
// import ReactMarkdown from 'react-markdown';
import { fetchArticleBySlug } from "../../services/api/articles";
import styles from "./Article.module.scss";
import { TArticle } from "../../services/types/types";

type ArticleProps = {
  article: TArticle[];
};

const Article: FC<ArticleProps> = ({ article }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentArticle, setCurrentArticle] = useState<TArticle>(article);
  const params = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        if (!article) {
          const slug = params.slug;
          const data = await fetchArticleBySlug(slug);
          if (data) {
            setCurrentArticle(data);
          } else {
            setError("Article not found");
          }
        } else {
          setCurrentArticle(article);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [article, params.slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.article}>
      <div className={styles.leftSide}>
        <div className={styles.titleLikes}>
          <p className={styles.title}>{currentArticle.title}</p>
          <img
            className={styles.heart}
            src="/assets/img/heart.svg"
            alt="like"
          />
          {/* TODO: !!!!!!! */}
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
        {/* /!!!/ */}
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

      {/* <ReactMarkdown>{currentArticle.body}</ReactMarkdown> */}
    </section>
  );
};

export default Article;

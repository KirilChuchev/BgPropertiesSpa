import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import authService from "../../services/authService";
import userService from "../../services/userService";
import searchSetService from "../../services/searchSetService";
import bgPropertyService from "../../services/bgPropertyService";
import statisticsService from "../../services/statisticService";

import styles from "./Home.module.css";

const Home = () => {
  var userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims?.token ? userClaims.token : null;

  let history = useHistory();

  const [searchSets, setSearchSets] = useState([]);
  const [newlyBgPropertiesModel, setNewlyBgPropertiesModel] = useState([]);
  const [trackedBgPropertiesModel, setTrackedBgPropertiesModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await searchSetService
        .fetchAll(token)
        .then(setSearchSets)
        .catch((err) => {
          if (err.includes("Unauthorized") || err.includes("Forbidden")) {
            userService.logout();
          }
          console.log(err);
          history.push("/login");
          return null;
        });
      await statisticsService
        .fetchUserNewly(token)
        .then(setNewlyBgPropertiesModel)
        .catch((err) => {
          if (err.includes("Unauthorized") || err.includes("Forbidden")) {
            userService.logout();
          }
          console.log(err);
          history.push("/login");
          return null;
        });
      await bgPropertyService
        .userTracked(token)
        .then((trackedBgProperties) => {
          setTrackedBgPropertiesModel(trackedBgProperties);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.includes("Unauthorized") || err.includes("Forbidden")) {
            userService.logout();
          }
          console.log(err);
          history.push("/login");
          return null;
        });
    };

    fetchData();
  }, [token, history]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <section className={styles.wrapper}>
      <article>
        {userClaims !== null && (
          <section className={styles.header}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <p>Hello, {userClaims.username}</p>
            <Link to="/" onClick={() => userService.logout()}>
              Logout
            </Link>
          </section>
        )}

        {userClaims === null && (
          <section className={styles.header}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </section>
        )}
      </article>

      {userClaims !== null && (
        <section className={styles.sectionWrapper}>
          <article className={styles.headerLinksWrapper}>
            <Link
              to={`/searchsets`}
              className={`${styles.headerLink} ${
                searchSets.length === 0 ? styles.disableStatisticsLink : null
              }`}
            >
              Вижте Вашите SearchSet-ве
            </Link>
          </article>

          <section className={styles.detailsWrapper}>
            <article className={styles.details}>
              <h3 className={styles.subTitle}>Детайли:</h3>
              <section className={styles.detailsContent}>
                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>Брой SearchSet-ове:</h4>
                  <span className={styles.detailValue}>
                    {searchSets.length}
                  </span>
                </article>

                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>
                    Брой нови обяви на имоти:
                  </h4>
                  <span className={styles.detailValue}>
                    {newlyBgPropertiesModel.bgProperties.length}
                  </span>
                </article>

                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>
                    Брой SearchSet-ове, които следите:
                  </h4>
                  <span className={styles.detailValue}>
                    {trackedBgPropertiesModel.bgProperties.length}
                  </span>
                </article>

                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>
                    Вашето описание на SearchSet-a:
                  </h4>
                  <span className={styles.detailValue}>
                    {/* {searchSet.description} */}
                  </span>
                </article>
              </section>
            </article>
          </section>

          <article className={styles.statistics}>
            <h3 className={styles.subTitle}>
              Статистическа информация от всички Ваши SearchSet-ове:
            </h3>
            <section className={styles.statisticsContent}>
              <Link
                to={`/statistics/searchsets/all/bg-properties/all-newly`}
                className={`${styles.statisticsLink} ${
                  newlyBgPropertiesModel.length === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Нови оферти
              </Link>
              <Link
                to={`/searchsets/all/bg-properties/all-tracked`}
                className={`${styles.statisticsLink} ${
                  trackedBgPropertiesModel.length === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Маркирани оферти
              </Link>
            </section>
          </article>
        </section>
      )}
    </section>
  );
};

export default Home;

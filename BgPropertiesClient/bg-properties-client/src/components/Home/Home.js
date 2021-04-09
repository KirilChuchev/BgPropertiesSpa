import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import authService from "../../services/authService";
import userService from "../../services/userService";

import styles from "./Home.module.css";

const Home = () => {
  var userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims?.token ? userClaims.token : null;

  let history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [userDataInfo, setUserDataInfo] = useState({});

  useEffect(() => {
    const fetchData = () => {
      if (!token) {
        return null;
      }

      userService
        .userDataInfo(token)
        .then(setUserDataInfo)
        .then(() => {
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
            <p>Здравейте, {userClaims.username}</p>
            <Link
              to="/login"
              onClick={() => {
                userService.logout();
              }}
            >
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
              to={userDataInfo.allSearchSetsByUser !== 0 ? `/searchsets` : `/searchsets/create`}
              className={`${styles.headerLink}`}
            >
              {userDataInfo.allSearchSetsByUser !== 0 ? `Вижте Вашите SearchSet-ве` : `Създайте Вашият първи SearchSet`}
              
            </Link>
          </article>

          <section className={styles.detailsWrapper}>
            <article className={styles.details}>
              <h3 className={styles.subTitle}>Детайли:</h3>
              <section className={styles.detailsContent}>
                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>Брой SearchSet-ове:</h4>
                  <span className={styles.detailValue}>
                    {userDataInfo.allSearchSetsByUser}
                  </span>
                </article>

                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>
                    Общ брой нови обяви на имоти:
                  </h4>
                  <span className={styles.detailValue}>
                    {userDataInfo.allNewlyBgPropertiesByUser}
                  </span>
                </article>

                <article className={styles.detail}>
                  <h4 className={styles.detailLabel}>
                    Общ брой маркирани обяви:
                  </h4>
                  <span className={styles.detailValue}>
                    {userDataInfo.allTrackedBgPropertiesByUser}
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
                  userDataInfo.allNewlyBgPropertiesByUser === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Нови обяви
              </Link>
              <Link
                to={`/searchsets/all/bg-properties/all-tracked`}
                className={`${styles.statisticsLink} ${
                  userDataInfo.allTrackedBgPropertiesByUser === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Маркирани обяви
              </Link>
            </section>
          </article>
        </section>
      )}
    </section>
  );
};

export default Home;

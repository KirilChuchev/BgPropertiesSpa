import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ThemeContext from "../../contexts/ThemeContext";
import FormikControl from "../Common/FormViewComponents/FormikControl";

import authService from "../../services/authService";
import userService from "../../services/userService";
import { themeStyleSelector } from "../../utils/themeStyleSelector";

import styles from "./Home.module.css";

const Home = () => {
  var userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims?.token ? userClaims.token : null;

  let history = useHistory();

  const { theme, changeTheme } = useContext(ThemeContext);

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
          console.log(err);
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
    // <section className={theme === "light" ? styles.sectionWrapper : styles.darkSectionWrapper}>
    // className={themeStyleSelector(theme, styles, styles.sectionWrapper)}
    <section>
      <article>
        {userClaims !== null && (
          <section className={styles.header}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            {/* <button onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>{theme}</button> */}
            {/* className={styles.selectGroupWrapper} */}
            {/* <section >
              <FormikControl
                control={"select"}
                element={themeStyleElementConsts}
                options={themeStyleConsts}
                // handleChange={handleChange}
                title={"Изберете тема"}
                styles={styles}
              />
              </section> */}

            <article className={styles.selectArticle}>
              <label htmlFor="themeStyle">Изберете тема</label>

              <select
                onChange={(event) => changeTheme(event.target.value)}
                value={theme}
                name="themeStyle"
                id="themeStyle"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </article>

            <p>Здравейте, {userClaims.username}</p>
            <Link
              to="/login"
              onClick={() => {
                changeTheme("light")
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
        <section className={themeStyleSelector(
          theme,
          styles,
          styles.lightThemeSectionWrapper
        )}>
          <article className={styles.headerLinksWrapper}>
            <Link
              to={
                userDataInfo.allSearchSetsByUser !== 0
                  ? `/searchsets`
                  : `/searchsets/create`
              }
              className={`${styles.headerLink}`}
            >
              {userDataInfo.allSearchSetsByUser !== 0
                ? `Вижте Вашите SearchSet-ове`
                : `Създайте Вашият първи SearchSet`}
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

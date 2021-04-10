import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import ThemeContext from "../../../contexts/ThemeContext";

import authService from "../../../services/authService";
import searchSetService from "../../../services/searchSetService";

import { bgPropertyFloorConsts } from "../../../constants/bgPropertyConsts";

import { themeStyleSelector } from "../../../utils/themeStyleSelector";
import { extractSearchSetCriteriasByType } from "../../../utils/helpers";

import styles from "./SearchSet.module.css";
import bgPropertyService from "../../../services/bgPropertyService";
import statisticService from "../../../services/statisticService";

const SearchSet = () => {
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { theme } = useContext(ThemeContext);

  let { searchSetId } = useParams();

  const [searchSet, setSearchSet] = useState({});
  const [newlyBgPropertiesCount, setNewlyBgPropertiesCount] = useState(Number);
  const [trackedBgPropertiesCount, setTrackedBgPropertiesCount] = useState(
    Number
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function executeFetches() {
      await searchSetService.fetchOne(token, searchSetId).then((data) => {
        setSearchSet(data);
      });
      await statisticService
        .fetchSearchSetNewly(token, searchSetId)
        .then((data) => {
          setNewlyBgPropertiesCount(data.bgProperties.length);
        })
        .catch((err) => console.log(err));

      await bgPropertyService
        .searchSetTracked(token, searchSetId)
        .then((data) => {
          setTrackedBgPropertiesCount(data.bgProperties.length);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }

    executeFetches();
  }, [token, searchSetId]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {searchSet && (
        <section className={themeStyleSelector(theme, styles, styles.lightThemeSearchSetSectionWrapper)}>
          <header className={styles.searchSetHeader}>
            <h2 className={styles.titleSection}>
              Информация за Вашият SearchSet:
            </h2>
            <article className={styles.headerLinksWrapper}>
              <Link
                to={`/searchsets/${searchSetId}/bg-properties`}
                className={`${styles.headerLink} ${
                  searchSet.bgPropertiesCount === 0
                    ? styles.disableHeaderLink
                    : null
                }`}
              >
                Вижте наличните обяви
              </Link>
              <Link
                to={`/searchsets/edit/${searchSetId}`}
                className={styles.headerLink}
              >
                Редактирайте Searchset-a
              </Link>
            </article>
          </header>

          <section className={styles.searchSetDetailsWrapper}>
            <article className={styles.searchSetDetails}>
              <h3 className={styles.subTitle}>Детайли:</h3>
              <section className={styles.searchSetDetailsContent}>
                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>Име:</h4>
                  <span className={styles.searchSetDetailValue}>
                    {searchSet.name}
                  </span>
                </article>

                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>
                    Общ брой обяви на имоти:
                  </h4>
                  <span className={styles.searchSetDetailValue}>
                    {searchSet.bgPropertiesCount}
                  </span>
                </article>

                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>
                    Брой нови обяви на имоти:
                  </h4>
                  <span className={styles.searchSetDetailValue}>
                    {newlyBgPropertiesCount}
                  </span>
                </article>

                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>
                    Брой маркирани обяви на имоти:
                  </h4>
                  <span className={styles.searchSetDetailValue}>
                    {trackedBgPropertiesCount}
                  </span>
                </article>

                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>Създаден на:</h4>
                  <span className={styles.searchSetDetailValue}>
                    {searchSet.createdOn}
                  </span>
                </article>

                <article className={styles.searchSetDetail}>
                  <h4 className={styles.searchSetDetailLabel}>
                    Вашето описание на SearchSet-a:
                  </h4>
                  <span className={styles.searchSetDetailValue}>
                    {searchSet.description}
                  </span>
                </article>
              </section>
            </article>

            <article className={styles.criteriasDetailsWrapper}>
              <h3 className={styles.subTitle}>Критерии на Вашият SearchSet:</h3>
              <section className={styles.criteriasDetailsContent}>
                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) => x.name.endsWith("PropType")
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>
                      Вид на имота:
                    </h4>
                    {extractSearchSetCriteriasByType(
                      searchSet.searchCriterias,
                      (x) => x.name.endsWith("PropType")
                    ).map((x) => (
                      <span
                        key={x.name + x.value}
                        className={styles.criteriaValue}
                      >
                        {x.value}
                      </span>
                    ))}
                  </article>
                )}

                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) => x.name === "priceFrom" || x.name === "priceTo"
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>
                      Цена на имота:
                    </h4>
                    <section>
                      {extractSearchSetCriteriasByType(
                        searchSet.searchCriterias,
                        (x) => x.name === "priceFrom" || x.name === "priceTo"
                      ).map((x) => (
                        <article
                          key={x.name + x.value}
                          className={styles.criteria}
                        >
                          <span className={styles.criteriaLabel}>
                            {x.name === "priceFrom" ? "От:" : "До:"}
                          </span>
                          <span className={styles.criteriaValue}>
                            {x.value} EUR
                          </span>
                        </article>
                      ))}
                    </section>
                  </article>
                )}

                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) =>
                    x.name === "pricePerSqrMFrom" || x.name === "pricePerSqrMTo"
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>
                      Цена на кв.м площ:
                    </h4>
                    {extractSearchSetCriteriasByType(
                      searchSet.searchCriterias,
                      (x) =>
                        x.name === "pricePerSqrMFrom" ||
                        x.name === "pricePerSqrMTo"
                    ).map((x) => (
                      <article
                        key={x.name + x.value}
                        className={styles.criteria}
                      >
                        <span className={styles.criteriaLabel}>
                          {x.name === "pricePerSqrMFrom" ? "От:" : "До:"}
                        </span>
                        <span className={styles.criteriaValue}>
                          {x.value} EUR
                        </span>
                      </article>
                    ))}
                  </article>
                )}

                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) => x.name === "sizeFrom" || x.name === "sizeTo"
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>Квадратура:</h4>
                    {extractSearchSetCriteriasByType(
                      searchSet.searchCriterias,
                      (x) => x.name === "sizeFrom" || x.name === "sizeTo"
                    ).map((x) => (
                      <article
                        key={x.name + x.value}
                        className={styles.criteria}
                      >
                        <span className={styles.criteriaLabel}>
                          {x.name === "sizeFrom" ? "От:" : "До:"}
                        </span>
                        <span className={styles.criteriaValue}>
                          {x.value}м2
                        </span>
                      </article>
                    ))}
                  </article>
                )}

                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) => x.name === "floorFrom" || x.name === "floorTo"
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>Етаж:</h4>
                    {extractSearchSetCriteriasByType(
                      searchSet.searchCriterias,
                      (x) => x.name === "floorFrom" || x.name === "floorTo"
                    ).map((x) => (
                      <article
                        key={x.name + x.value}
                        className={styles.criteria}
                      >
                        <span className={styles.criteriaLabel}>
                          {x.name === "floorFrom" ? "От:" : "До:"}
                        </span>
                        <span className={styles.criteriaValue}>
                          {
                            bgPropertyFloorConsts.find(
                              (y) => y.value === x.value
                            ).key
                          }{" "}
                          етаж
                        </span>
                      </article>
                    ))}
                  </article>
                )}

                {!!extractSearchSetCriteriasByType(
                  searchSet.searchCriterias,
                  (x) => x.name === "cityRegion"
                ).length && (
                  <article className={styles.criteriasGroup}>
                    <h4 className={styles.criteriasGroupTitle}>
                      Местоположение:
                    </h4>
                    {extractSearchSetCriteriasByType(
                      searchSet.searchCriterias,
                      (x) => x.name === "cityRegion"
                    ).map((x) => (
                      <span
                        key={x.name + x.value}
                        className={styles.criteriaValue}
                      >
                        {/* <strong>{x.name}: </strong> */}
                        {x.value}
                      </span>
                    ))}
                  </article>
                )}
              </section>
            </article>
          </section>

          <article className={styles.searchSetStatistics}>
            <h3 className={styles.subTitle}>
              Статистическа информация за Вашият SearchSet:
            </h3>
            <section className={styles.searchSetStatisticsContent}>
              <Link
                to={`/statistics/searchsets/${searchSetId}/bg-properties/all-newly`}
                className={`${styles.searchSetStatisticsLink} ${
                  // searchSet.bgPropertiesCount === 0
                  newlyBgPropertiesCount === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Нови обяви
              </Link>
              <Link
                to={`/searchsets/${searchSetId}/bg-properties/all-tracked`}
                className={`${styles.searchSetStatisticsLink} ${
                  // searchSet.bgPropertiesCount === 0
                  trackedBgPropertiesCount === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                Маркирани обяви
              </Link>
              <Link
                to={`/statistics/top-profitable/${searchSetId}`}
                className={`${styles.searchSetStatisticsLink} ${
                  searchSet.bgPropertiesCount === 0
                    ? styles.disableStatisticsLink
                    : null
                }`}
              >
                {/* Top profitable BgProperties */}
                Най-изгодна оферта
              </Link>
            </section>
          </article>
        </section>
      )}
    </>
  );
};

export default SearchSet;

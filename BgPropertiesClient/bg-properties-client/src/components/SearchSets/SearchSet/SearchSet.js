import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Fragment as section, useEffect, useState } from "react";

import authService from "../../../services/authService";
import searchSetService from "../../../services/searchSetService";

import { bgPropertyFloorConsts } from "../../../constants/bgPropertyConsts";

import { extractSearchSetCriteriasByType } from "../../../utils/helpers";

import styles from "./SearchSet.module.css";

const SearchSet = () => {
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { searchSetId } = useParams();

  const [searchSet, setSearchSet] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchSetService.fetchOne(token, searchSetId).then((data) => {
      setSearchSet(data);
      setIsLoading(false);
    });
  }, [token, searchSetId]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {searchSet && (
        <section className={styles.searchSetSectionWrapper}>
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
                Виж наличните обяви
              </Link>
              <Link
                to={`/searchsets/edit/${searchSetId}`}
                className={styles.headerLink}
              >
                Редактирай Searchset-a
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
                    Брой обяви на имоти:
                  </h4>
                  <span className={styles.searchSetDetailValue}>
                    {searchSet.bgPropertiesCount}
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
                {/* {searchSet.searchCriterias
                  ?.filter((x) => x.value !== "")
                  ?.map((x) => (
                    <p key={x.name + x.value} className={styles.criteria}>
                      <strong>{x.name}: </strong>
                      {x.value}
                    </p>
                  ))} */}

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
                        {/* <strong>{x.name}: </strong> */}
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
                className={styles.searchSetStatisticsLink}
              >
                Нови оферти
              </Link>
              <Link
                to={`/searchsets/${searchSetId}/bg-properties/all-tracked`}
                className={styles.searchSetStatisticsLink}
              >
                Маркирани оферти
              </Link>
              <Link
                to={`/statistics/top-profitable/${searchSetId}`}
                className={styles.searchSetStatisticsLink}
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

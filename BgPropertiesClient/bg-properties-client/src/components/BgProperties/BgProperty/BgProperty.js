import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThemeContext from "../../../contexts/ThemeContext";
import authService from "../../../services/authService";
import bgPropertyService from "../../../services/bgPropertyService";

import { parseTime } from "../../../utils/helpers";
import { themeStyleSelector } from "../../../utils/themeStyleSelector";

import styles from "./BgProperty.module.css";

const BgProperty = () => {
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  let { theme } = useContext(ThemeContext);

  let { bgPropertyId, searchSetId } = useParams();

  const [bgPropertyModel, setBgPropertyModel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let bgProperty = bgPropertyModel?.bgProperty;

  useEffect(() => {
    bgPropertyService
      .fetchOne(token, bgPropertyId, searchSetId)
      .then((data) => {
        setBgPropertyModel(data);
        setIsLoading(false);
      });
  }, [token, bgPropertyId, searchSetId, bgProperty?.isTracked]);

  async function trackBgProperty(token, bgPropertyId) {
    await bgPropertyService.trackOne(token, bgPropertyId);
    setBgPropertyModel({
      ...bgPropertyModel,
      bgProperty: { ...bgProperty, isTracked: !bgProperty.isTracked },
    });
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <section className={themeStyleSelector(
      theme,
      styles,
      styles.lightThemeBgPropertySectionWrapper
    )}>
      {bgPropertyModel && (
        <article
          className={styles.bgPropertyWrapper}
        >
          <section
            className={
              bgProperty.isTracked
                ? styles.bgPropertyDetailsInfoTracked
                : styles.bgPropertyDetailsInfo
            }
            onClick={() => trackBgProperty(token, bgPropertyId)}
          >
            {bgProperty.isTracked && (
              <span className={styles.trackedSign}>
                TRACKED
                <span className={styles.trackedSignTooltip}>
                  click to un-track
                </span>
              </span>
            )}
            {!bgProperty.isTracked && (
              <span className={styles.notTrackedSign}>
                NOT-TRACKED
                <span className={styles.trackedSignTooltip}>
                  click to track
                </span>
              </span>
            )}
          </section>

          <section className={styles.bgPropertyDetailsWrapper}>
            <section className={styles.bgPropertyDetails}>
              <span className={styles.bgPropertyDetailsLabel}>URL:</span>
              <span className={styles.bgPropertyDetailsValue}>
                {bgProperty.url && (
                  <a
                    href={`${bgProperty.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bgProperty.url}
                  </a>
                )}
                {!bgProperty.url && "n/a"}
              </span>
            </section>

            <section className={styles.bgPropertyDetails}>
              <span className={styles.bgPropertyDetailsLabel}>
                ?????????????????? ????:
              </span>
              <span className={styles.bgPropertyDetailsValue}>
                {parseTime(bgProperty.createdOn) || "n/a"}
              </span>
            </section>

            <section className={styles.buildingInfo}>
              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>
                  ?????? ???? ??????????:
                </span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.propertyType || "n/a"}
                </span>
              </section>

              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>
                  ?????? ????????????????????????:
                </span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.buildingType || "n/a"}
                </span>
              </section>

              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>
                  ???????????? ???? ????????????????????????:
                </span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.buildingYear || "n/a"}
                </span>
              </section>
            </section>

            <section className={styles.bgPropertyDetails}>
              <span className={styles.bgPropertyDetailsLabel}>
                ????????????????????????????:
              </span>
              <span className={styles.bgPropertyDetailsValue}>
                {bgProperty.location || "n/a"}
              </span>
            </section>

            <section className={styles.placementInfo}>
              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>????????:</span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.area || "n/a"}
                  {!!bgProperty.area && "??2"}
                </span>
              </section>

              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>????????:</span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.floor || "n/a"}
                </span>
              </section>

              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>
                  ?????? ???????? ?????????? ?? ????????????????:
                </span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.totalBuildingFloors || "n/a"}
                </span>
              </section>
            </section>

            <section className={styles.priceInfo}>
              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>????????:</span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.priceInEUR || "n/a"}
                  {!!bgProperty.priceInEUR && " EUR"}
                </span>
              </section>

              <section className={styles.bgPropertyDetails}>
                <span className={styles.bgPropertyDetailsLabel}>
                  ???????? ???? ????.??.
                </span>
                <span className={styles.bgPropertyDetailsValue}>
                  {bgProperty.pricePerSquareMeterInEUR || "n/a"}
                  {!!bgProperty.pricePerSquareMeterInEUR && " EUR"}
                </span>
              </section>
            </section>

            <section className={styles.bgPropertyDetails}>
              <span className={styles.bgPropertyDetailsValue}>
                <span className={styles.bgPropertyDetailsLabel}>????????????????:</span>
                {bgProperty.description || "n/a"}
              </span>
            </section>
          </section>
        </article>
      )}
    </section>
  );
};

export default BgProperty;

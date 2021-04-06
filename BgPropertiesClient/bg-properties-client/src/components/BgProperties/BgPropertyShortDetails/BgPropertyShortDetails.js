import { useState } from "react";
import authService from "../../../services/authService";
import bgPropertyService from "../../../services/bgPropertyService";

import styles from "./BgPropertyShortDetails.module.css";

const BgPropertyShortDetails = ({ index, bgProperty, onBgPropertyClick }) => {
  const userClaims = authService.getLocalStorageUserClaims();
  var token = userClaims.token;

  const [bgPropertyState, setBgPropertyState] = useState({ ...bgProperty });

  async function trackBgProperty(token, bgPropertyId) {
    await bgPropertyService.trackOne(token, bgPropertyId);
    setBgPropertyState({
      ...bgPropertyState,
      isTracked: !bgPropertyState.isTracked,
    });

    console.log(bgPropertyState);
  }

  return (
    <article
      className={`${styles.bgPropertyShortDetailsCard} ${
        bgPropertyState.isNewly ? styles.newly : null
      }`}
    >
      <section
        className={`${
          bgPropertyState.isTracked
            ? styles.bgPropertyShortDetailCardInfoTracked
            : styles.bgPropertyShortDetailCardInfo
        }`}
        onClick={() => trackBgProperty(token, bgPropertyState.id)}
      >
        {bgPropertyState.isTracked && (
          <section className={styles.trackedSignSection}>
            <span className={styles.bgPropertyShortDetailNumber}>{index}</span>
            {bgProperty.isNewly && <span className={styles.newSign}>NEW!</span>}
            <span className={styles.trackedSign}>TRACKED</span>
            <span className={styles.trackedSignTooltip}>click to un-track</span>
          </section>
        )}
        {!bgPropertyState.isTracked && (
          <section className={styles.notTrackedSignSection}>
            <span className={styles.bgPropertyShortDetailNumber}>{index}</span>
            {bgProperty.isNewly && <span className={styles.newSign}>NEW!</span>}
            <span className={styles.notTrackedSign}>NOT-TRACKED</span>
            <span className={styles.trackedSignTooltip}>click to track</span>
          </section>
        )}
      </section>

      <section
        className={styles.bgPropertyShortDetailsWrapper}
        onClick={() => onBgPropertyClick(bgPropertyState.id)}
      >
        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Вид на имота:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.propertyType}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Площ:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.area}
            {!!bgPropertyState.area && " м2"}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Местоположение:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.location}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Етаж:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.floor}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Тип строителство:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.buildingType}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Година на строителство:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.buildingYear}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Цена:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgPropertyState.priceInEUR}
            {!!bgPropertyState.priceInEUR && " EUR"}
          </span>
        </section>
      </section>
    </article>
  );
};

export default BgPropertyShortDetails;

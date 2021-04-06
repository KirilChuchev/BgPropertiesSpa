import styles from "./BgPropertyShortDetails.module.css";

const BgPropertyShortDetails = ({
  index,
  bgProperty,
  onBgPropertyClick,
}) => {
  return (
    <article
      className={`${styles.bgPropertyShortDetailsCard} ${
        bgProperty.isNewly ? styles.newly : null
      }`}
      onClick={() => onBgPropertyClick(bgProperty.id)}
    >
      <section className={styles.bgPropertyShortDetailCardInfo}>
        <span className={styles.bgPropertyShortDetailNumber}>{index}</span>
          {bgProperty.isNewly && <span className={styles.newSign}>NEW!</span>}
          {bgProperty.isTracked && <span className={styles.trackedSign}>TRACKED</span>}
      </section>

      <section className={styles.bgPropertyShortDetailsWrapper}>
        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Вид на имота:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.propertyType}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Площ:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.area}
            {!!bgProperty.area && " м2"}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Местоположение:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.location}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Етаж:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.floor}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Тип строителство:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.buildingType}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>
            Година на строителство:
          </span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.buildingYear}
          </span>
        </section>

        <section className={styles.bgPropertyShortDetail}>
          <span className={styles.bgPropertyShortDetailLabel}>Цена:</span>
          <span className={styles.bgPropertyShortDetailValue}>
            {bgProperty.price}
            {!!bgProperty.price && " EUR"}
          </span>
        </section>
      </section>
    </article>
  );
};

export default BgPropertyShortDetails;

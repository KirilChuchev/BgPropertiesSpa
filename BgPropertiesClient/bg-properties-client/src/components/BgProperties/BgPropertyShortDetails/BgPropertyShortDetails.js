import styles from "./BgPropertyShortDetails.module.css";

const BgPropertyShortDetails = ({
  resource,
  index,
  bgProperty,
  onBgPropertyClick,
}) => {

  let isNew = bgProperty.isNewly ? styles.newly : null;

  return (
    <article
      className={`${styles.bgPropertyShortDetailsCard} ${isNew}`}
      onClick={() => onBgPropertyClick(bgProperty.id)}
    >
      <span className={styles.bgPropertyShortDetailNumber}>{index}</span>

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

        {resource !== "user-tracked" && (
          <p>IsNewly: {bgProperty.isNewly ? "new" : "Not new"}</p>
        )}
        <p>IsTracked: {bgProperty.isTracked ? "Tracked" : "No"}</p>
      </section>
    </article>
  );
};

export default BgPropertyShortDetails;

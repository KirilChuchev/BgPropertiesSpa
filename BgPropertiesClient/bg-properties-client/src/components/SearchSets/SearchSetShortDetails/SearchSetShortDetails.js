import styles from "./SearchSetShortDetails.module.css";

const SearchSetShortDetails = ({ searchSet, index, onSearchSetClick }) => {
  function parseTime(str) {
    let date = Date(str);
    // console.log(date);
    let endIndex = date.indexOf("GMT");
    console.log(endIndex);
    let res = date.slice(0, endIndex);
    // console.log(res);
    return res;
  }
  return (
    <article
      className={styles.searchSetShortDetailsCard}
      onClick={() => onSearchSetClick(searchSet.id)}
    >
      <span className={styles.searchSetShortDetailNumber}>{index}</span>

      <section className={styles.searchSetShortDetailsWrapper}>
        <section className={styles.searchSetShortDetail}>
          <span className={styles.searchSetShortDetailLabel}>Име:</span>
          <span className={styles.searchSetShortDetailValue}>
            {searchSet.name}
          </span>
        </section>

        <section className={styles.searchSetShortDetail}>
          <span className={styles.searchSetShortDetailLabel}>Създаден на:</span>
          <span className={styles.searchSetShortDetailValue}>
            {parseTime(searchSet.createdOn)}
          </span>
        </section>

        <section className={styles.searchSetShortDetail}>
          <span className={styles.searchSetShortDetailLabel}>Брой обяви:</span>
          <span className={styles.searchSetShortDetailValue}>
            {searchSet.bgPropertiesCount}
          </span>
        </section>

        <section className={styles.searchSetShortDetail}>
          <span className={styles.searchSetShortDetailLabel}>Описание:</span>
          <span className={styles.searchSetShortDetailValue}>
            {searchSet.description
              ? searchSet.description.slice(0, 30).trim() + "..."
              : "n/a"}
          </span>
        </section>
      </section>
    </article>
  );
};

export default SearchSetShortDetails;

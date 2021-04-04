import styles from './SearchSetShortDetails.module.css'

const SearchSetShortDetails = ({ searchSet, index }) => {
  function parseTime(str) {
    let date = Date(str);
    return date;
  }
  return (
    <article className={styles.searchSetShortDetailsArticle}>
      <section className={styles.nameSection}>
        <p>№: {index}</p>
        <p>Име: {searchSet.name}</p>
      </section>
      {/* <p>Създаден на: {parseTime(searchSet.createdOn)}</p> */}
      <p className={styles.createdOn}>Създаден на: {parseTime(searchSet.createdOn)}</p>
      <p className={styles.bgPropertiesCount}>Брой обяви: {searchSet.bgPropertiesCount}</p>
      <p className={styles.description}>Описание: {searchSet.description ? searchSet.description.slice(0, 30).trim() + "..." : "n/a"}</p>
    </article>
  );
};

export default SearchSetShortDetails;

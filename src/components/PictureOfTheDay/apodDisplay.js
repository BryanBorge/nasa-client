import React, {useEffect, useState} from "react";
import moment from "moment";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./apodDisplay.module.css";
import classes from "./apodDisplay.module.css";

const ApodDisplay = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new moment());
  const [allowNext, setAllowNext] = useState(date > moment().subtract(1, "day"));

  useEffect(() => {
    setAllowNext(date > moment().subtract(1, "day"));
    setLoading(true);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK&date=${date
        .toISOString()
        .slice(0, 10)}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, [date]);

  const handleBackDate = () => {
    let ystd = new moment(date);
    ystd.subtract(1, "day");
    setDate(ystd);
  };

  const handleNextDate = () => {
    let tmrw = new moment(date);
    tmrw.add(1, "day");
    setDate(tmrw);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.btn}>
          <h5 onClick={handleBackDate}>PREVIOUS DAY</h5>
        </div>
        {data && !loading && <h2 className={styles.date}>{date.format("LL")}</h2>}
        {data && loading && <LoadingSpinner />}
        {!allowNext && (
          <div className={styles.btn}>
            <h5 onClick={handleNextDate}>NEXT DAY</h5>
          </div>
        )}
      </div>
      {data && <h1 className={styles.title}>{data.title}</h1>}
      {data && <p className={styles.explanation}>{data.explanation}</p>}
      {data && data.copyright && (
        <h6 className={styles.copyright}>
          Copyright: <strong>{data.copyright} </strong>
        </h6>
      )}
      {data &&
        (data.media_type === "video" ? (
          <a href={data.hdurl || data.url} target="blank">
            <iframe
              src={data.url}
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={data.title}
              className={styles.responsive}
            />
          </a>
        ) : (
          <a href={data.hdurl || data.url} target="blank">
            <img className={styles.responsive} alt={data.title} src={data.hdurl || data.url} />
          </a>
        ))}
    </div>
  );
};

export default ApodDisplay;

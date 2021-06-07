import React, {useEffect, useState} from "react";
import moment from "moment";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./apodDisplay.module.css";
import {FaArrowLeft} from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa";

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
        <h2>Astronomy Picture of the Day</h2>
        <p>
          Each day a different image or photograph of our fascinating universe is featured, along with a brief
          explanation written by a professional astronomer.
        </p>
        {data && !loading ? (
          <div className={styles.dateContainer}>
            <div className={styles.btn}>
              <FaArrowLeft onClick={handleBackDate} className={styles.icon} />
            </div>
            <h2 className={styles.date}>{date.format("LL")}</h2>
            {!allowNext && (
              <div className={styles.btn}>
                <FaArrowRight onClick={handleNextDate} className={styles.icon} />
              </div>
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {data && <h1 className={styles.title}>{data.title}</h1>}
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
      {data && <p className={styles.explanation}>{data.explanation}</p>}
      {data && data.copyright && (
        <div className={styles.copyrightContainer}>
          <h6>
            Copyright: <strong>{data.copyright} </strong>
          </h6>
          <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">
            <h6>NASA's APOD Page</h6>
          </a>
        </div>
      )}
    </div>
  );
};

export default ApodDisplay;

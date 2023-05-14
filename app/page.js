"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [imageLink, setImageLink] = useState("");
  const [movieLink, setMovieLink] = useState("");
  const loadingData = "Loading new doggo!";
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const updateDoggo = async () => {
    setDataIsLoading(true);
    const doggoData = await fetch("/api/doggo/getdoggo")
      .then((response) => response.json())
      .then((data) => {
        const buffer = Buffer.from(data.image, "base64");
        const byteArray = new Uint8Array(buffer);
        const blob = new Blob([byteArray]);
        const objectURL = URL.createObjectURL(blob);

        if (data.isMovie) {
          setImageLink("");
          setMovieLink(objectURL);
        } else {
          setMovieLink("");
          setImageLink(objectURL);
        }
        setDataIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setDataIsLoading(false);
      });
  };
  return (
    <main className={styles.main}>
      <h1>Woof!</h1>
      <button onClick={updateDoggo} className={styles.doggoBtn}><b>Get doggo!</b></button>
      <div className={styles.loadingContainer}>
      {dataIsLoading &&
        <p className={styles.loadingData}>{loadingData}</p>
      }
      </div>
      {imageLink && (
        <div className={styles.dogMedia}>
        <img src={imageLink} alt="failed to load image, is link dead?"/>
        </div>
      )}
      {movieLink && (
        <div className={styles.dogMedia}>
        <video
          class="dogMedia"
          controls
          playsInline
          src={movieLink}
          alt="failed to load dog video, is link dead?"
        >
          <source src={movieLink} type="video/mp4" />
        </video>
        </div>
      )}
    </main>
  );
}

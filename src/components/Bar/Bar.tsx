"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import classNames from "classnames";
import { trackType } from "@/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBar from "../Volume/VolumeBar";
import { toMMSS } from "@/common";
type PlayerType = {
  track: trackType;
};

export default function Bar({ track }: PlayerType) {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);

  const duration = audioRef.current?.duration;
  // const audioCurrentTime = audioRef.current?.currentTime || 0;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      {setCurrentTime(audioRef.current!.currentTime)}
    );
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };
  const handleLoop = ()=>{
    setIsLooping((prev)=>!prev);
    if(audioRef.current){
      if(isLooping){
        audioRef.current!.loop = true;
      } else {audioRef.current!.loop = false;}
    }
  };
  

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio ref={audioRef} src={track.track_file}></audio>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div
                onClick={() => {
                  alert("Функция в разработке");
                }}
                className={styles.playerBtnPrev}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.playerBtnPlay, styles.btn)}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={`img/icon/sprite.svg#${
                      isPlaying ? "icon-pause" : "icon-play"
                    }`}
                  />
                </svg>
              </div>
              <div
                onClick={() => {
                  alert("Функция в разработке");
                }}
                className={styles.playerBtnNext}
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                onClick={handleLoop}
                className={classNames(styles.playerBtnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classNames(styles.playerBtnRepeatSvg, {
                    [styles.active]: isLooping,
                  })}
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                onClick={() => {
                  alert("Функция в разработке");
                }}
                className={classNames(styles.playerBtnShuffle, styles.btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <span className={styles.trackPlayAuthorLink}>
                    {track.name}
                  </span>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <span className={styles.trackPlayAlbumLink}>
                    {track.author}
                  </span>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div
                  className={classNames(styles.trackPlayLike, styles.btnIcon)}
                >
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlayDislike,
                    styles.btnIcon
                  )}
                >
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.barVolumeBlock}>
            {audioRef.current && (
                <div className={styles.audioTimer}>
                  <span>
                    {toMMSS(audioRef.current!.currentTime)}/{toMMSS(Number(duration))}
                  </span>
                </div>
              )
            }
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              
              <div className={classNames(styles.volumeProgress, styles.btn)}>
                <VolumeBar
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

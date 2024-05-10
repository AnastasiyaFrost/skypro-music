"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import classNames from "classnames";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBar from "../Volume/VolumeBar";
import { toMMSS } from "@/common";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setIsPlaying, setIsShuffled, setNextTrack, setPrevTrack } from "@/store/features/playlistSlice";

export default function Bar() {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isShuffled = useAppSelector((state) => state.playlist.isShuffled);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const dispatch = useAppDispatch();

  const duration = audioRef.current?.duration;

  const togglePlay = () => {
    if (audioRef.current) {
      dispatch(setIsPlaying(!isPlaying));
    }
  };
  useEffect(()=>{
    if(isPlaying){
      audioRef.current?.play();
    } else {audioRef.current?.pause()}
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current!.currentTime);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current]);

  useEffect(() => {
    audioRef.current?.addEventListener("ended", () => {
      dispatch(setNextTrack());
    });

    // Воспроизводим новый трек
    audioRef.current?.play();

    return () => {
      audioRef.current?.addEventListener("ended", () => {
        dispatch(setNextTrack());
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef.current, dispatch]);

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
  const handleLoop = () => {
    setIsLooping(!isLooping);
    
    if (audioRef.current) {
      audioRef.current!.loop = !isLooping;
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              autoPlay
              ref={audioRef}
              src={currentTrack.track_file}
            ></audio>
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
                      dispatch(setPrevTrack());
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
                      dispatch(setNextTrack());
                    }}
                    className={styles.playerBtnNext}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={handleLoop}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.btnIcon
                    )}
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
                      dispatch(setIsShuffled(!isShuffled));
                    }}
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.btnIcon
                    )}
                  >
                    <svg
                      className={classNames(styles.playerBtnShuffleSvg, {
                        [styles.active]: isShuffled,
                      })}
                    >
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
                        {currentTrack.name}
                      </span>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <span className={styles.trackPlayAlbumLink}>
                        {currentTrack.author}
                      </span>
                    </div>
                  </div>
                  <div className={styles.trackPlayLikeDis}>
                    <div
                      className={classNames(
                        styles.trackPlayLike,
                        styles.btnIcon
                      )}
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
                      {toMMSS(audioRef.current!.currentTime)}/
                      {toMMSS(Number(duration))}
                    </span>
                  </div>
                )}
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>

                  <div
                    className={classNames(styles.volumeProgress, styles.btn)}
                  >
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
      )}
    </>
  );
}

import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  currentPlaylist: trackType[];
  shuffledPlaylist: trackType[];
  isPlaying: boolean;
  isShuffled: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffled: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracks: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.currentPlaylist = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
      state.isPlaying = true;
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffled
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsShuffled: (state, action: PayloadAction<boolean>) => {
      state.isShuffled = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setPrevTrack,
  setNextTrack,
  setIsPlaying,
  setIsShuffled,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;

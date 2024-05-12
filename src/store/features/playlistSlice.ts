import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  defaultPlaylist: trackType[];
  currentTrack: null | trackType;
  currentPlaylist: trackType[];
  shuffledPlaylist: trackType[];
  isPlaying: boolean;
  isShuffled: boolean;
  filterOptions: {
    author: string[];
    searchValue: string;
  };
  filteredTracks: trackType[];
};

const initialState: PlaylistStateType = {
  defaultPlaylist: [],
  currentTrack: null,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffled: false,
  filterOptions: {
    author: [],
    searchValue: "",
  },
  filteredTracks: [],
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
    setDefaultPlaylist: (state, action: PayloadAction<trackType[]>) => {
      state.defaultPlaylist = action.payload;
      state.filteredTracks = action.payload;
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
      console.log(currentTrackIndex);
      console.log(newTrack);
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsShuffled: (state, action: PayloadAction<boolean>) => {
      state.isShuffled = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{ author?: string[]; searchValue?: string }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
      };
      state.filteredTracks = state.defaultPlaylist.filter((t) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(t.author)
          : true;
        return isAuthors;
      });
    },
  },
});

export const {
  setCurrentTrack,
  setDefaultPlaylist,
  setPrevTrack,
  setNextTrack,
  setIsPlaying,
  setIsShuffled,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;

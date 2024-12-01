import { Middleware } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import {
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
  setPosition,
  setDuration,
  killTrack,
} from "@/redux/playSlice";

const audioMiddleware: Middleware = (store) => {
  let sound: Audio.Sound | null = null;

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      sound = null;
    }
  };

  return (next) => async (action: any) => {
    const state = store.getState();
    const { currentTrack, isPlaying, position } = state.player;

    switch (action.type) {
      case playTrack.type:
        await stopSound();
        store.dispatch(setDuration(0));
        store.dispatch(setPosition(0));
        if (action.payload) {
          const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: action.payload.url },
            {
              shouldPlay: true,
              positionMillis: position,
              isLooping: false,
            }
          );
          sound = newSound;
          if (status.isLoaded) {
            store.dispatch(setDuration(status.durationMillis || 0));
            store.dispatch(setPosition(status.positionMillis || 0));
          }
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              //   store.dispatch(setPosition(status.positionMillis || 0));
              //   store.dispatch(setDuration(status.durationMillis || 0));
              if (status.didJustFinish) {
                store.dispatch(playNextTrack());
              }
            }
          });
        }
        break;

      case pauseTrack.type:
        if (sound) {
          await sound.pauseAsync();
        }
        break;

      case playNextTrack.type:
      case playPreviousTrack.type:
        next(action);
        store.dispatch(setDuration(0));
        store.dispatch(setPosition(0));
        const updatedTrack = store.getState().player.currentTrack;
        if (updatedTrack) {
          store.dispatch(playTrack(updatedTrack));
        }
        break;

      case setPosition.type:
        if (sound) {
          await sound.setPositionAsync(action.payload);
        }
        break;

      case killTrack.type:
        await stopSound();
        break;

      default:
        break;
    }
    return next(action);
  };
};

export default audioMiddleware;

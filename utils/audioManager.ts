import { Audio, AVPlaybackStatus } from "expo-av";

class AudioManager {
  private static instance: AudioManager;
  private sound: Audio.Sound | null = null;

  private constructor() {}

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async loadSound(uri: string, shouldPlay: boolean = false) {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }

    const { sound, status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay }
    );

    this.sound = sound;
    return status;
  }

  async play() {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  async pause() {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  async stop() {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }

  async seekTo(position: number) {
    if (this.sound) {
      await this.sound.setPositionAsync(position);
    }
  }

  setOnPlaybackStatusUpdate(callback: (status: AVPlaybackStatus) => void) {
    if (this.sound) {
      this.sound.setOnPlaybackStatusUpdate(callback);
    }
  }
}

export default AudioManager.getInstance();

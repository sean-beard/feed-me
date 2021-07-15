<template>
  <div>
    <button class="btn" @click="handleRewind">
      <i class="material-icons">replay_10</i>
      <span class="visually-hidden">Rewind 10 seconds</span>
    </button>

    <button class="btn" @click="handlePlaybackRateChange">
      {{ playbackRate + "x" }}
    </button>

    <button class="btn" @click="handleFastForward">
      <i class="material-icons">forward_30</i>
      <span class="visually-hidden">Fast forward 30 seconds</span>
    </button>

    <figure>
      <audio
        ref="audioRef"
        controls
        :src="item.mediaUrl"
        preload="auto"
        @loadeddata="setCurrentTime"
        @pause="postCurrentTime"
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <figcaption v-html="item.description"></figcaption>
    </figure>
  </div>
</template>

<script>
import { put } from "@/utils/api.js";

export default {
  name: "AudioPlayer",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      playbackRate: 1,
    };
  },
  methods: {
    postCurrentTime() {
      const audioElement = this.$refs.audioRef;
      if (!audioElement) return;

      const item = { ...this.item, currentTime: audioElement.currentTime };

      put("/item", { items: [item] }).catch(() => {
        console.log("Error saving current playback time...");
      });
    },
    setCurrentTime() {
      const audioElement = this.$refs.audioRef;
      if (!audioElement || !this.item.currentTime) return;
      audioElement.currentTime = Math.floor(this.item.currentTime).toFixed(1);
    },
    handleRewind() {
      const audioElement = this.$refs.audioRef;
      if (!audioElement) return;
      audioElement.currentTime = audioElement.currentTime - 10;
    },
    handleFastForward() {
      const audioElement = this.$refs.audioRef;
      if (!audioElement) return;
      audioElement.currentTime = audioElement.currentTime + 30;
    },
    handlePlaybackRateChange() {
      const audioElement = this.$refs.audioRef;
      if (!audioElement) return;

      switch (this.playbackRate) {
        case 1:
          this.playbackRate = 1.5;
          break;
        case 1.5:
          this.playbackRate = 2;
          break;
        case 2:
          this.playbackRate = 1;
          break;
        default:
          this.playbackRate = 1;
      }

      audioElement.playbackRate = this.playbackRate;
    },
  },
  beforeDestroy() {
    const audioElement = this.$refs.audioRef;
    if (!audioElement) return;

    audioElement.removeEventListener("canplay", this.postCurrentTime);
    audioElement.removeEventListener("pause", this.postCurrentTime);
  },
};
</script>

<style scoped>
i {
  font-size: 2.5em;
}

audio {
  border: 3px solid darkgray;
  background-color: darkgray;
  margin-bottom: 3rem;
  width: 75%;
  max-width: 1280px;
}

audio:focus {
  border: 3px solid #1a237e;
}

.btn {
  margin: 2rem 0 4rem 0;
  min-width: 100px;
}

.btn + .btn {
  margin-left: 0.5rem;
}

/* Tablet */
@media (max-width: 48em) {
  audio {
    border: none;
    background-color: transparent;
    width: 100%;
  }
}
</style>

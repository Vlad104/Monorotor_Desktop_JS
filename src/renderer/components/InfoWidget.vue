<template>
  <div class="widget-info">
    <a class="widget-info__item">Объём с дозатора А: {{ protocol.data.volume.value * protocol.data.ratioA.value }} мл</a>
    <a class="widget-info__item">Объём с дозатора Б: {{ protocol.data.volume.value * protocol.data.ratioB.value }} мл</a>
    <a
      class="widget-info__item"
    >Время дозирования: {{ 60 * protocol.data.volume.value / protocol.data.feedrate.value + protocol.data.feedrate.value / protocol.data.accel.value }} секунд</a>
    <a class="widget-info__item">Таймер: 0 секунд</a>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "InfoWidget",
  props: ["protocol"],
  data() {
    return {};
  },
  mounted() {
    bus.$on("start", () => {
      this.stopTimer();
      this.updateTimer();
    });
    bus.$on("stop", () => {
      this.stopTimer();
    });
  },
  methods: {
    updateTimer() {
      let timer = this.protocol.calcTime();
      this.timeId = setInterval(() => {
        if (this.timerSec <= timer) {
          this.timerSec += 1;
        } else {
          this.stopTimer();
        }
      }, 1000);
    },
    stopTimer() {
      this.timerSec = 0;
      clearInterval(this.timeId);
      this.timeId = null;
    }
  }
};
</script>

<style scoped>

.widget-info {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

.widget-info__item {
  margin-bottom: 15px;
}
</style>

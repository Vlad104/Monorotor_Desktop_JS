<template>
  <div class="widget-info">
    <a class="widget-info__item">Объём с дозатора А: <i>{{ this.calculateA() }} мл</i></a>
    <a class="widget-info__item">Объём с дозатора Б: <i>{{ this.calculateB() }} мл</i></a>
    <a
      class="widget-info__item"
    >Время дозирования: <i>{{ (60 * protocol.data.volume.value / protocol.data.feedrate.value + protocol.data.feedrate.value / protocol.data.accel.value).toFixed(2) }} секунд</i></a>
    <a class="widget-info__item">Таймер: <i>{{ time }} секунд</i></a>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "InfoWidget",
  props: ["protocol"],
  data() {
    return {
      time: 0,
    };
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
        if (this.time <= timer) {
          this.time += 1;
        } else {
          this.stopTimer();
        }
      }, 1000);
    },
    stopTimer() {
      this.time = 0;
      clearInterval(this.timeId);
      this.timeId = null;
    },
    calculateA() {
      if (this.protocol.data.dozator.value === '2') {
        return (this.protocol.data.volume.value * this.protocol.data.ratioA.value).toFixed(3);
      } else if (this.protocol.data.dozator.value === '0') {
        return (this.protocol.data.volume.value * 1.0).toFixed(3);
      } else {
        return 0;
      }
    },
    calculateB() {
      if (this.protocol.data.dozator.value === '2') {
        return (this.protocol.data.volume.value * this.protocol.data.ratioB.value).toFixed(3);
      } else if (this.protocol.data.dozator.value === '1') {
        return (this.protocol.data.volume.value * 1.0).toFixed(3);
      } else {
        return 0;
      }
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

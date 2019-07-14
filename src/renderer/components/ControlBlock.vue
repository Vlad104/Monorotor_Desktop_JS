<template>
  <div class="control-frame" v-on:keydown="doContinuesWithKey" v-on:keyon="doContinuesWithKey">
    <input class="btn btn_start" type="button" value="Старт" v-on:click="doStart">
    <input class="btn btn_cont" type="button" value="Непрерывно" v-on:click="doContinues">
    <input class="btn btn_press" type="button" value="По нажатию" v-on:mousedown="doContinues" v-on:mouseup="doStop">
    <input class="btn btn_stop" type="button" value="Стоп" v-on:click="doStop">
  </div>
</template>

<script>

import { bus } from '../main';

export default {
  name: "ControlBlock",
  props: ["protocol"],
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    doStart() {
      let data = this.protocol.makeStart();
      this.protocol.clearData();
      console.log(data);
      bus.$emit('transmitData', data);
      bus.$emit('start');
    },
    doContinues() {
      let data = this.protocol.makeContinues();
      this.protocol.clearData();
      console.log(data);
      bus.$emit('transmitData', data);
    },
    doStop() {
      let data = this.protocol.makeStop();
      this.protocol.clearData();
      console.log(data);
      bus.$emit('transmitData', data);
      bus.$emit('stop');
    },
    doSave() {
      let data = this.protocol.makeSave();
      this.protocol.clearData();
      console.log(data);
      bus.$emit('transmitData', data);
    },
    doContinuesWithKey(event) {
      if (event.keyCode !== 32) {
        return;
      }
      this.doContinues();
    },
    doStopWithKey(event) {
      if (event.keyCode !== 32) {
        return;
      }
      this.doStop();
    },
  }
};
</script>

<style scoped>

.control-frame {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  grid-template-areas: "starts cont press" "stop stop stop";
  width: 100%;
}

.btn {
  height: 2rem;
  border: 1px solid var(--secondColor);
  border-radius: 5px;
  background-color: var(--secondColor);
  color: #FFFFFF;
  /* color: rgb(206, 205, 205); */
  font-size: 1rem;
}

.btn_start:hover,
.btn_cont:hover,
.btn_press:hover {
  border-color: var(--secondDarkColor);
  background-color: var(--secondDarkColor);
  box-shadow: 0 0 10px 0px var(--secondColor);
}

.btn_stop:hover {
  border-color: #6d1818;
  background-color: #6d1818;
  box-shadow: 0 0 10px 0px #ac2424;
}

.btn:active {
  box-shadow: inset 0 0 4px 0px #000;
}

.btn:not(hover), btn:not(active) {
   transition: 0.3s;
}

.btn_start {
  grid-area: starts;
}

.btn_cont {
  grid-area: cont;
}

.btn_press {
  grid-area: press;
}

.btn_stop {
  grid-area: stop;
  border-color: #b32828;
  background-color: #b32828;
  color: #FFFFFF;
  /* animation: stopBlinking 1s easy-out 0 inf alternative; */
}

@keyframes stopBlinking {
  0% {
    height: 2rem;
  }
  100% {
    height: 3rem;
  }
}

</style>

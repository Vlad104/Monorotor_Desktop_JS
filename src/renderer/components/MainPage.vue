<template>
  <div id="main">
    <div class="head-wrapper">
      <SerialInterface></SerialInterface>
    </div>

    <div class="body-wrapper">
      <div class="left-wrapper">
        <div class="input-frame">
          <InputBlock label="Объём, мл" v-bind:value.sync="protocol.data.volume.value"></InputBlock>
          <InputBlock label="Подача, мл/мин" v-bind:value.sync="protocol.data.feedrate.value"></InputBlock>
          <InputComplexBlock label="Соотношение А/B" 
            v-bind:valueA="protocol.data.propA.value"
            v-bind:valueB="protocol.data.propB.value"
            v-on:changeA="updateRatioA"
            v-on:changeB="updateRatioB"
          ></InputComplexBlock>
          <InputBlock label="Реверс, мл" v-bind:value.sync="protocol.data.reverse.value"></InputBlock>
          <select class="select-items" v-model="protocol.data.dozator.value">
            <option value="2">Два дозатора</option>
            <option value="0">Дозатор А</option>
            <option value="1">Дозатор Б</option>
          </select>
        </div>
      </div>

      <div class="right-wrapper">
        <InfoBlock :protocol="protocol"></InfoBlock>
        <ControlBlock :protocol="protocol"></ControlBlock>
      </div>
    </div>
  </div>
</template>

<script>
import SerialInterface from "./SerialInterface";
import InputBlock from "./InputBlock";
import InputComplexBlock from "./InputComplexBlock";
import InfoBlock from "./InfoBlock";
import ControlBlock from "./ControlBlock";

import Protocol from '../modules/protocol';
import { bus } from '../main';
import { setInterval } from 'timers';

export default {
  name: "main-page",
  data() {
    return {
      timerSec: 0,
      totalTime: 0,
      protocol: new Protocol(),
      timeId: null,
    };
  },
  methods: {
    updateRatioA(value) {
      this.protocol.data.propA.value = value;
      this.protocol.updateRatios();
    },
    updateRatioB(value) {
      this.protocol.data.propB.value = value;
      this.protocol.updateRatios();
    }
  },
  components: {
    SerialInterface,
    InputBlock,
    InputComplexBlock,
    InfoBlock,
    ControlBlock,
  }
};
</script>

<style>
#main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.head-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 100px 0 100px;
  width: calc(100% - 200px);
  height: 12vh;
  /* border-bottom: solid 1px #bb6222; */
}

.body-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 100px 0 100px;
  width: calc(100% - 200px);
  height: auto;
}

.left-wrapper {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
}

.right-wrapper {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
}

.input-frame {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5px 0 0 0;
}

.select-items {
  margin: 10px 0 0 0;
  text-align: left;
  background-color: var(--backgroundColor);
  height: 1.6rem;
  width: 200px;
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
  margin-top: 20px;
}


.select-items:hover {
  box-shadow: 0 0 10px 0px #FFF;
}

.select-items:focus {
  box-shadow: 0 0 10px 0px #FFF;
}

.select-items:not(hover) {
   transition: 0.3s;
}


</style>

<template>
  <div id="main">
    <div class="head-wrapper">
      <SerialInterface></SerialInterface>
      <!-- <div>
        <a>Справка</a>
        <a>Настройки</a>
      </div> -->
    </div>

    <div class="body-wrapper">
      <div class="left-wrapper">
        <div class="input-frame">
          <Switcher class="switcher" v-on:change.native="switchParams"></Switcher>
          <div v-if="mainParams">
            <InputBlock label="Объём, мл" v-bind:value.sync="protocol.data.volume.value"></InputBlock>
            <InputBlock label="Подача, мл/мин" v-bind:value.sync="protocol.data.feedrate.value"></InputBlock>
            <InputComplexBlock
              label="Соотношение А/B"
              v-if="protocol.data.dozator.value !== '0' && protocol.data.dozator.value !== '1'"
              v-bind:valueA="protocol.data.propA.value"
              v-bind:valueB="protocol.data.propB.value"
              v-on:changeA="updateRatioA"
              v-on:changeB="updateRatioB"
            ></InputComplexBlock>
            <SelectBlock :items="dozatorsMode" v-on:select="updateDozatorsMode" :label="'Режим'"></SelectBlock>
          </div>
          <div v-else>
            <InputBlock label="Реверс, мл" v-bind:value.sync="protocol.data.reverse.value"></InputBlock>
            <InputBlock label="Ускорение" v-bind:value.sync="protocol.data.accel.value"></InputBlock>
            <InputBlock label="Передаточное А" v-bind:value.sync="protocol.data.gearA.value"></InputBlock>
            <InputBlock label="Передаточное Б" v-bind:value.sync="protocol.data.gearB.value"></InputBlock>
          </div>
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
import SelectBlock from "./SelectBlock";
import Switcher from "./Switcher";

import Protocol from "../modules/protocol";
import { bus } from "../main";

export default {
  name: "main-page",
  data() {
    return {
      timerSec: 0,
      totalTime: 0,
      protocol: new Protocol(),
      timeId: null,
      dozatorsMode: [
        { value: "2", text: "Два дозатора" },
        { value: "0", text: "Дозатор А" },
        { value: "1", text: "Дозатор Б" }
      ],
      mainParams: true,
    };
  },
  mounted() {
    bus.$on("reset_data", () => this.protocol.reset());
  },
  methods: {
    updateRatioA(value) {
      this.protocol.data.propA.value = value;
      this.protocol.updateRatios();
    },
    updateRatioB(value) {
      this.protocol.data.propB.value = value;
      this.protocol.updateRatios();
    },
    updateDozatorsMode(value) {
      this.protocol.data.dozator.value = value;
    },
    switchParams() {
      this.mainParams = !this.mainParams;
      console.log(this.mainParams);
    }
  },
  components: {
    SerialInterface,
    InputBlock,
    InputComplexBlock,
    InfoBlock,
    ControlBlock,
    SelectBlock,
    Switcher
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

.switcher {
  position: relative;
  left: 160px;
}

</style>

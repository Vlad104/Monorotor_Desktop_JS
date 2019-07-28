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
        <div class="swithets-bar">
          <Switcher class="switcher" v-on:change.native="switchParams" :id="'params'" :text="'Параметры'"></Switcher>
          <Switcher class="switcher" v-on:change.native="switchUnits" :id="'units'" :text="'Единицы'"></Switcher>
        </div>
        <div class="input-frame">
          <div v-if="mainParams">
            <div v-if="volumeUnits">
              <InputBlock label="Объём, мл" v-bind:value.sync="protocol.data.volume.value"></InputBlock>
              <InputBlock label="Подача, мл/мин" v-bind:value.sync="protocol.data.feedrate.value"></InputBlock>
              <InputComplexBlock
                label="Соотношение А:B"
                v-if="protocol.data.dozator.value !== '0' && protocol.data.dozator.value !== '1'"
                v-bind:valueA="protocol.data.propA.value"
                v-bind:valueB="protocol.data.propB.value"
                v-on:changeA="updateRatioA"
                v-on:changeB="updateRatioB"
              ></InputComplexBlock>
            </div>
            <div v-else>
              <InputBlock label="Масса, г" v-bind:value.sync="protocol.massUnits.mass" v-on:change.native="massUnitsChange"></InputBlock>
              <InputBlock label="Подача, г/мин" v-bind:value.sync="protocol.massUnits.feedrate" v-on:change.native="feedrateUnitsChange"></InputBlock>
              <InputComplexBlock
                label="Соотношение А:B"
                v-if="protocol.data.dozator.value !== '0' && protocol.data.dozator.value !== '1'"
                v-bind:valueA="protocol.massUnits.propA"
                v-bind:valueB="protocol.massUnits.propB"
                v-on:changeA="updateMassRatioA"
                v-on:changeB="updateMassRatioB"
              ></InputComplexBlock>
            </div>
            <SelectBlock :items="dozatorsMode" v-on:select="updateDozatorsMode" :label="'Режим'"></SelectBlock>
          </div>
          <div v-else>
            <div v-if="volumeUnits">
              <InputBlock label="Реверс, мл" v-bind:value.sync="protocol.data.reverse.value"></InputBlock>
              <InputBlock label="Ускорение" v-bind:value.sync="protocol.data.accel.value"></InputBlock>
            </div>
            <div v-else>
              <InputBlock label="Реверс, г" v-bind:value.sync="protocol.massUnits.reverse" v-on:change.native="reverseUnitsChange"></InputBlock>
              <InputBlock label="Ускорение" v-bind:value.sync="protocol.massUnits.accel" v-on:change.native="accelUnitsChange"></InputBlock>
              <InputBlock label="Плотность А, г/мл" v-bind:value.sync="protocol.massUnits.densityA" v-on:change.native="updateMassDensityA"></InputBlock>
              <InputBlock label="Плотность Б, г/мл" v-bind:value.sync="protocol.massUnits.densityB" v-on:change.native="updateMassDensityB"></InputBlock>
            </div>
            <InputBlock label="Передаточное А" v-bind:value.sync="protocol.data.gearA.value"></InputBlock>
            <InputBlock label="Передаточное Б" v-bind:value.sync="protocol.data.gearB.value"></InputBlock>
          </div>
        </div>
      </div>

      <div class="right-wrapper">
        <InfoBlock :protocol="protocol"></InfoBlock>
        <ControlBlock v-if="serialConnected" :protocol="protocol"></ControlBlock>
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
      volumeUnits: true,
      serialConnected: false,
    };
  },
  mounted() {
    bus.$on("reset_data", () => this.protocol.reset());
    bus.$on("serial", (flag) => this.serialConnected = flag);
    // this.protocol.load();
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      this.protocol.save();
    });
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
    },
    switchUnits() {
      this.volumeUnits = !this.volumeUnits;
      this.recalculateUnits();
    },
    massUnitsChange() {
      this.protocol.data.volume.value = (
        parseFloat(this.protocol.massUnits.mass * this.protocol.massUnits.ratioA / this.protocol.massUnits.densityA) +
        parseFloat(this.protocol.massUnits.mass * this.protocol.massUnits.ratioB / this.protocol.massUnits.densityB)
      ).toFixed(5);
    },
    feedrateUnitsChange() {
      this.protocol.data.feedrate.value = (
        parseFloat(this.protocol.massUnits.feedrate * this.protocol.massUnits.ratioA / this.protocol.massUnits.densityA) +
        parseFloat(this.protocol.massUnits.feedrate * this.protocol.massUnits.ratioB / this.protocol.massUnits.densityB)
      ).toFixed(5);
    },
    reverseUnitsChange() {
      this.protocol.data.reverse.value = (
        parseFloat(this.protocol.massUnits.reverse * this.protocol.massUnits.ratioA / this.protocol.massUnits.densityA) +
        parseFloat(this.protocol.massUnits.reverse * this.protocol.massUnits.ratioB / this.protocol.massUnits.densityB)
      ).toFixed(5);
    },
    accelUnitsChange() {
      this.protocol.data.reverse.value = (
        parseFloat(this.protocol.massUnits.accel * this.protocol.massUnits.ratioA / this.protocol.massUnits.densityA) +
        parseFloat(this.protocol.massUnits.accel * this.protocol.massUnits.ratioB / this.protocol.massUnits.densityB)
    ).toFixed(5)
    },
    recalculateUnits() {
      this.massUnitsChange();
      this.feedrateUnitsChange();
      this.reverseUnitsChange();
      this.accelUnitsChange();
    },
    updateMassRatioA(value) {
      this.protocol.massUnits.propA = value;

      this.protocol.massUnits.ratioA = (this.protocol.massUnits.propA / (parseFloat(this.protocol.massUnits.propA) + parseFloat(this.protocol.massUnits.propB))).toFixed(5);
      this.protocol.massUnits.ratioB = (this.protocol.massUnits.propB / (parseFloat(this.protocol.massUnits.propA) + parseFloat(this.protocol.massUnits.propB))).toFixed(5);

      this.protocol.data.propA.value = this.protocol.massUnits.propA / this.protocol.massUnits.densityA;
      this.updateRatioA(this.protocol.data.propA.value);
      this.recalculateUnits();
    },
    updateMassRatioB(value) {
      this.protocol.massUnits.propB = value;

      this.protocol.massUnits.ratioA = (this.protocol.massUnits.propA / (parseFloat(this.protocol.massUnits.propA) + parseFloat(this.protocol.massUnits.propB))).toFixed(5);
      this.protocol.massUnits.ratioB = (this.protocol.massUnits.propB / (parseFloat(this.protocol.massUnits.propA) + parseFloat(this.protocol.massUnits.propB))).toFixed(5);

      this.protocol.data.propB.value = this.protocol.massUnits.propB / this.protocol.massUnits.densityB;
      this.updateRatioB(this.protocol.data.propB.value);
      this.recalculateUnits();
    },
    updateMassDensityA() {
      this.updateMassRatioA(this.protocol.massUnits.propA);
      // this.recalculateUnits();
    },
    updateMassDensityB() {
      this.updateMassRatioB(this.protocol.massUnits.propB);
      // this.recalculateUnits();
    },
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
  /* left: 160px; */
  left: 0px;
  margin-right: 10px;
}

.swithets-bar {
  display: flex;
  flex-direction: row;
}

</style>

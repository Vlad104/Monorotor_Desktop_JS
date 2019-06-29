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
          <InputComplexBlock label="Соотношение А/B" v-bind:valueA.sync="protocol.data.propA.value" v-bind:valueB.sync="protocol.data.propB.value"></InputComplexBlock>
          <InputBlock label="Реверс, мл" v-bind:value.sync="protocol.data.reverse.value"></InputBlock>
          <select class="select-items">
            <option value="2">Два дозатора</option>
            <option value="0">Дозатор А</option>
            <option value="1">Дозатор Б</option>
          </select>
        </div>
      </div>

      <div class="right-wrapper">
        <div class="info-frame">
          <div class="tab">
            <a class="tab__item tab__item_selected">Инфа</a>
            <a class="tab__item">Консоль</a>
            <a class="tab__item">Кнопки</a>
            <a class="tab__item">Текст</a>
          </div>
          <div class="widget">
            <div class="widget-info">
              <a class="widget-info__item">Объём с дозатора А: {{ protocol.data.volume.value * protocol.data.ratioA.value }} мл</a>
              <a class="widget-info__item">Объём с дозатора Б: {{ protocol.data.volume.value * protocol.data.ratioB.value }} мл</a>
              <a class="widget-info__item" v-bind:protocol="protocol">Время дозирования: {{ 60 *parseFloat(protocol.data.volume.value / protocol.data.feedrate.value) + parseFloat(protocol.data.feedrate.value / protocol.data.accel.value) }} секунд</a>
              <a class="widget-info__item">Таймер: {{ timeToEnd }} секунд</a>
            </div>
          </div>
        </div>

        <div class="control-frame">
          <input class="btn btn_start" type="button" value="Старт" v-on:click="makeParams">
          <input class="btn btn_cont" type="button" value="Непрерывно">
          <input class="btn btn_press" type="button" value="По нажатию">
          <input class="btn btn_stop" type="button" value="Стоп">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SerialInterface from "./SerialInterface";
import InputBlock from "./InputBlock";
import InputComplexBlock from "./InputComplexBlock";

import Protocol from '../modules/protocol';

export default {
  name: "main-page",
  data() {
    return {
      timeToEnd: 0,
      protocol: new Protocol(),
    };
  },
  methods: {
    makeParams() {
      console.log(this.protocol.makeTransmitData());
    },
    setParams(slug, value) {
      params[slug] = value;
    }
  },
  components: {
    SerialInterface,
    InputBlock,
    InputComplexBlock,
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

.info-frame {
  margin-top: 40px; 
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 300px; */
  border: solid 1px #bb6222;
  border-radius: 8px;
}

.tab {
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
  border-bottom: 1px solid #bb6222;
}

.tab__item {
  margin: 10px 0 8px 10px; 
}

.tab__item_selected {
  border: 1px solid #2863b3;
  border-radius: 4px;
}

.widget {
  margin: 15px;
}

.widget-info {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

.widget-info__item {
  margin-bottom: 15px;
}

.select-items {
  margin: 10px 0 0 0;
  text-align: left;
  background-color: #181e24;
  height: 1.6rem;
  width: 200px;
  border: 1px solid #bb6222;
  border-radius: 5px;
  color: #bb6222;
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
  margin-top: 20px;
}

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
  border: 1px solid #2863b3;
  border-radius: 5px;
  background-color: #2863b3;
  color: #181e24;
  /* color: rgb(206, 205, 205); */
  font-size: 1rem;
  font-weight: bolder;
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

<template>
  <div id="main">
    <div class="left-wrapper">
      <div class="serial-port-frame">
        <a class="input-block__label">Выберите COM-порт</a>
        <select class="select-items">
          <option v-for="port in serialPorts" :key="port.id" value="sp0">{{ port }}</option>
        </select>
      </div>

      <div class="input-frame">
        <div class="input-block">
          <a class="input-block__label">Объём, мл</a>
          <input class="input-field" type="text" v-model="params.volume">
        </div>
        <div class="input-block">
          <a class="input-block__label">Подача, мл/мин</a>
          <input class="input-field" type="text" v-model="params.feedrate">
        </div>
        <div class="input-block">
          <a class="input-block__label">Соотношение А/B</a>
          <div class="input-block-ratio">
            <input class="input-field input-field-ratio" type="text" v-model="params.ratioA">
            <a
              class="input-field-proc input-field-proc_left"
            >{{ (100 * params.ratioA / (params.ratioA + params.ratioB)).toFixed(3) }}%</a>
            <input class="input-field input-field-ratio" type="text" v-model="params.ratioB">
            <a
              class="input-field-proc input-field-proc_right"
            >{{ (100 * params.ratioB / (params.ratioA + params.ratioB)).toFixed(3) }}%</a>
          </div>
        </div>
        <select class="select-items">
          <option value="AB">Два дозатора</option>
          <option value="A">Дозатор А</option>
          <option value="B">Дозатор Б</option>
        </select>
      </div>
    </div>

    <div class="right-wrapper">
      <div class="info-frame">
        <a class="input-block__label">До окончания дозирования осталось {{ timeToEnd }} секунд</a>
      </div>

      <div class="control-frame">
        <input class="btn" type="button" value="Старт">
        <input class="btn" type="button" value="Непрерывно">
        <input class="btn" type="button" value="По нажатию">
        <input class="btn btn_stop" type="button" value="Стоп">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-page",
  data() {
    return {
      params: {
        volume: 0,
        feedrate: 0,
        accel: 0,
        ratioA: 1,
        ratioB: 10,
        gearA: 0,
        gearB: 0
      },
      serialPorts: ["COM1", "COM2", "COM3"],
      timeToEnd: 87
    };
  },
  methods: {}
};
</script>

<style>
#main {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.input-frame {
  display: flex;
  flex-direction: column;
  margin: 0 auto auto 2em;
}

.input-block {
  margin: 10px 0 10px 0;
  width: 200px;
}

.input-block-ratio {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.input-field {
  text-align: left;
  background-color: #181e24;
  height: 1.6rem;
  width: 100%;
  border: 1px solid #bb6222;
  border-radius: 5px;
  color: #bb6222;
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.input-field:hover {
  /* box-shadow: 0 0 40px 40px #bb622288; */
  background-color: #182024;
}

.input-field-ratio {
  display: inline;
  width: 45%;
}

.input-field-proc {
  position: absolute;
  top: calc(1.6rem + 2px);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.158);
}

.input-field-proc_left {
  left: 22.5%;
  transform: translate(-50%);
}

.input-field-proc_right {
  right: 22.5%;
  transform: translate(50%);
}

.input-block__label {
  display: inline-block;
  font-size: 1em;
  height: 1em;
  margin: 0 0 10px 5px;
}

.select-items {
  text-align: left;
  background-color: #181e24;
  height: 1.6rem;
  width: 100%;
  border: 1px solid #bb6222;
  border-radius: 5px;
  color: #bb6222;
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
  margin-top: 20px;
}

.control-frame {
}

.btn {
  width: 100px;
  height: 2rem;
  border: 1px solid #2863b3;
  border-radius: 5px;
  background-color: #2863b3;
  color: #181e24;
  font-weight: bold;
}

.btn_stop {
  background-color: #b32828;
  animation: stopBlinking 1s easy-out 0 inf alternative;
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

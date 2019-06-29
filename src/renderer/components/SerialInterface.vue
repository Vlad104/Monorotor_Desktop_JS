<template>
  <div id="port">
    <a class="port__label">Выберите COM-порт</a>
    <select class="port__select">
      <option v-for="port in serialPorts" :key="port.id" value="sp0">{{ port }}</option>
    </select>
    <input type="button" class="port__button" v-bind:value="text" v-on:click="onConnect">
    <input type="button" class="port__button" value="Обновить" v-on:click="getPortsList">
  </div>
</template>

<script>
const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort(path, { baudRate: 19200 });
// const parser = new Readline();
// port.pipe(parser);

// parser.on('data', line => console.log(`> ${line}`));
// port.write('ROBOT POWER ON\n');

export default {
  name: "SerialInterface",
  data() {
    return {
      serialPorts: [],
      status: false,
      text: 'Подключить',
    };
  },
  mounted() {
    this.getPortsList();
  },
  methods: {
    async getPortsList() {
      const list = await SerialPort.list();
      // console.log(list);
      this.serialPorts = [];
      list.forEach(element => {
        this.serialPorts.push(element.comName);
      });
    },
    onConnect() {
      this.status = !this.status;
      this.text = (this.status) ? 'Отключить' : 'Подключить';
    }
  }
};
</script>

<style scoped>

#port {
  
}

.port__label {
  display: block;
  font-size: 0.9rem;
}

.port__select {
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
}

.port__button {
  text-align: center;
  background-color: #181e24;
  height: 1.6rem;
  width: 150px;
  border: 1px solid #bb6222;
  border-radius: 5px;
  color: #bb6222;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.port__button:hover {
  background-color: #bb6222;
  border: 1px solid #bb6222;
  color: #181e24;

}

</style>

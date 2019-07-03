<template>
  <div id="port">
    <a class="port__label">Выберите COM-порт</a>
    <select class="port__select" v-model="selectedPort">
      <option v-for="port in serialPorts" :key="port.id" :value="port">{{ port.comName }}</option>
    </select>
    <input type="button" class="port__button" v-bind:value="text" v-on:click="onConnect">
    <input type="button" class="port__button" value="Обновить" v-on:click="getPortsList">
  </div>
</template>

<script>
const SerialPort = require('serialport');

import { bus } from '../main';

export default {
  name: "SerialInterface",
  data() {
    return {
      serialPorts: [],
      status: false,
      text: 'Подключить',
      selectedPort: null,
      port: null,
      dataToTransmit: [],
    };
  },
  mounted() {
    this.getPortsList();
    bus.$on('transmitData', (data) => {
      console.log('transmitData');
      this.dataToTransmit = data;
      this.transmitData();
    });
  },
  methods: {
    async getPortsList() {
      const list = await SerialPort.list();
      console.log(list);
      this.serialPorts = [];
      list.forEach(element => {
        this.serialPorts.push(element);
      });
      if (this.serialPorts.length > 0) {
        this.selectedPort = this.serialPorts[0];
      }
    },
    onConnect() {
      this.status = !this.status;
      if (this.status) {
        this.doConect();
      } else {
        this.doDisconnect();
      }
    },
    doConect() {
      this.text = 'Отключить';
      console.log(this.selectedPort);
      this.port = new SerialPort(this.selectedPort.comName, {
        baudRate: 19200,
      });
      this.port.on('error', (err) => {
        console.log('Error: ', err.message)
      });
      this.port.write('=0', (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
      this.port.on('data', (data) => {
        console.log(data.toString());
        if (data.toString() == '!') {
          this.transmitData();
        } else if (data.toString() == '?') {
          console.log('WTF');
        }
      });
    },
    doDisconnect() {
      this.text = 'Подключить';
      this.port.close();
      console.log('Serial Port disconnected');
    },
    transmitData() {
      if (this.dataToTransmit.length > 0) {
        const message = this.dataToTransmit.shift();
        console.log('RX:');
        console.log(message);
        this.port.write(message);
      }
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
  background-color: var(--backgroundColor);
  height: 1.6rem;
  width: 200px;
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  padding: 0 0 0 0.8em;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.port__button {
  text-align: center;
  background-color: var(--backgroundColor);
  height: 1.6rem;
  width: 150px;
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  font-size: 0.9rem;
  box-sizing: border-box;
}

.port__button:hover {
  background-color: var(--mainColor);
  border: 1px solid var(--mainColor);
  color: var(--backgroundColor);
  box-shadow: 0 0 4px 0px var(--mainColor)
}

.port__button:active {
  box-shadow: inset 0 0 6px 0px #000;
}

.port__button:not(hover), btn:not(active) {
   transition: 0.3s;
}

</style>

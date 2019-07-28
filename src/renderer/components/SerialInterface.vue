<template>
  <div id="port">
    <a class="port__label">Выберите COM-порт</a>
    <!-- <SelectBlock></SelectBlock> -->
    <select class="port__select" v-model="selectedPort">
      <option v-for="port in serialPorts" :key="port.id" :value="port">{{ port.comName }}</option>
    </select>
    <input
      type="button"
      v-bind:class="{port__button: 'true', 'port__button_disconnected': !status}"
      v-bind:value="text"
      v-on:click="onConnect"
    />
    <input type="button" class="port__button" value="Обновить" v-on:click="getPortsList" />
  </div>
</template>

<script>
const SerialPort = require("serialport");

import { bus } from "../main";
import SelectBlock from "./SelectBlock";
import Modal from "./Modal";

export default {
  name: "SerialInterface",
  data() {
    return {
      serialPorts: [],
      status: false,
      text: "Подключить",
      selectedPort: null,
      port: null,
      dataToTransmit: [],
      rxWork: false,
    };
  },
  mounted() {
    this.getPortsList();
    bus.$on("transmitData", data => {
      console.log("transmitData");
      this.dataToTransmit = data;
      this.transmitData();
    });
  },
  methods: {
    async getPortsList() {
      const list = await SerialPort.list();
      this.serialPorts = [];
      list.forEach(element => {
        this.serialPorts.push(element);
      });
      if (this.serialPorts.length > 0) {
        this.selectedPort = this.serialPorts[0];
      } else {
        this.selectedPort = null;
      }
    },
    onConnect() {
      if (!this.status) {
        this.status = this.doConect();
      } else {
        this.status = this.doDisconnect();
      }
      bus.$emit('serial', this.status);
    },
    doConect() {
      if (this.selectedPort === null) {
        this.$modal.show(Modal, {text: 'Не выбран COM-порт'}, {draggable: true, width: 300, height: 200});
        return false;
      }
      this.text = "Отключить";
      bus.$emit("reset_data");
      this.port = new SerialPort(this.selectedPort.comName, {
        baudRate: 19200
      });
      this.port.on("error", err => {
        console.log("Error: ", err.message);
        this.$modal.show(Modal, {text: err.message}, {draggable: true});
      });
      this.port.write("=0", err => {
        if (err) {
          this.$modal.show(Modal, {text: err}, {draggable: true});
        }
        setTimeout(() => {
          if (!this.rxWork) {
            this.$modal.show(Modal, {text: 'Устройство не отвечает'}, {draggable: true});
            this.onConnect();
          }
        }, 1000);
      });
      this.port.on("data", data => {
        bus.$emit("rx", data.toString());
        if (data.toString() == "!") {
          this.rxWork = true;
          this.transmitData();
        } else if (data.toString() == "?") {
          console.log("Error on board");
        }
      });
      return true;
    },
    doDisconnect() {
      this.text = "Подключить";
      this.port.close();
      console.log("Serial Port disconnected");
      this.rxWork = false;
      return false;
    },
    transmitData() {
      if (!this.status) {
        this.$modal.show(Modal, {text: 'Не выбран COM-порт'}, {draggable: true, width: 300, height: 200});
        return;
      }

      if (this.dataToTransmit.length > 0) {
        const message = this.dataToTransmit.shift();
        bus.$emit("tx", message);
        this.port.write(message);
      }
    }
  },
  components: {
    SelectBlock
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

.port__select:hover {
  box-shadow: 0 0 10px 0px #fff;
}

.select-items:focus {
  box-shadow: 0 0 10px 0px #fff;
}

.select-items:not(hover) {
  transition: 0.3s;
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
  box-shadow: 0 0 4px 0px var(--mainColor);
}

.port__button:active {
  box-shadow: inset 0 0 6px 0px #000;
}

.port__button:not(hover),
btn:not(active) {
  transition: 0.3s;
}

.port__button_disconnected {
  animation: blinking 0.6s ease-out infinite alternate;
  /* box-shadow: 0 0 10px 0px #FFF; */
}

@keyframes blinking {
  0% {
    box-shadow: 0 0 0px 0px #fff;
  }
  100% {
    box-shadow: 0 0 15px 0px #fff;
  }
}
</style>

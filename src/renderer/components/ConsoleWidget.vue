<template>
  <div class="widget-console">
    <textarea readonly class="widget-console__text-area" v-model="consoleText" placeholder="Консоль для передачи команд..."></textarea>
    <div class="input-sender">
      <input class="message-sender__input" type="text" v-model="sendText" placeholder="Введите команду">
      <input class="message-sender__button" type="button" value="Отправить" v-on:click="sendMessage">
      <input class="message-sender__button" type="button" value="Очистить" v-on:click="clearTextArea">
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "ConsoleWidget",
//   props: ["data"],
  data() {
    return {
        consoleText: '',
        sendText: '',
    };
  },
  mounted() {
    bus.$on('tx', (data) => {
      this.consoleText += `>> ${data}\n`;
    });
    bus.$on('rx', (data) => {
      this.consoleText += `<< ${data}\n`;
    });
  },
  methods: {
    sendMessage() {
      if (this.sendText) {
        bus.$emit('transmitData', [this.sendText]);
      }
    },
    clearTextArea() {
      this.consoleText = '';
      this.sendText = '';
    },
  }
};
</script>

<style scoped>

.widget-console {
  display: flex;
  flex-direction: column;
  font-size: 0.4em;
  color: #FFFFFF;
  width: 100%;
  height: 100%;
}

.widget-console__text-area {
  margin: 0 0 10px 0;
  background: var(--backgroundLightColor);
  border: 1 solid var(--backgroundLightColor);
  border-radius: 8px;
  padding: 5px 0 0 10px;
  height: 80%;
  color: #FFFFFF;
  
}

.message-sender {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%
}

.message-sender__input {
  width: 50%;
  height: 1.2rem;

  background: var(--backgroundLightColor);
  border: 1 solid var(--backgroundLightColor);
  border-radius: 8px;
  padding: 0 0 0 10px;
  color: #FFFFFF;
}

.message-sender__button {
  height: 1.1rem;
  width: 20%;
  text-align: center;
  background-color: var(--backgroundColor);
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  color: var(--mainColor);
  box-sizing: border-box;
}

.message-sender__button:hover {
  background-color: var(--mainColor);
  border: 1px solid var(--mainColor);
  color: var(--backgroundColor);
  box-shadow: 0 0 4px 0px var(--mainColor)
}

.message-sender__button:active {
  box-shadow: inset 0 0 6px 0px #000;
}

.message-sender__button:not(hover), btn:not(active) {
  transition: 0.3s;
}


</style>

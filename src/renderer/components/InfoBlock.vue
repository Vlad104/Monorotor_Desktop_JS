<template>
  <div class="info-frame">
    <div class="tab">
      <!-- <a class="tab__item" v-for="tab in tabs" :key="tab.id" v-on:click="turnTab($event, tab.id)">{{ tab.text }}</a> -->
      <SimpleSVG
        :id="'#2863b3'"
        :filepath="tab.svg"
        :fill="'#181E24'"
        :stroke="'#2863b3'"
        :width="'20px'"
        :height="'20px'"
        v-for="tab in tabs" 
        :key="tab.id" 
        v-on:click.native="turnTab(tab)"
        class="tab__item"
      />
    </div>
    <div v-if="selectedTabId === 0" class="widget" >
      <InfoWidget :protocol="protocol"></InfoWidget>
    </div>
    <div v-else-if="selectedTabId === 1" class="widget" >
      <ConsoleWidget></ConsoleWidget>
    </div>
    <div v-else-if="selectedTabId === 2" class="widget" >
      <ButtonsWidget></ButtonsWidget>
    </div>
    <div v-else class="widget" >
      <TextWidget></TextWidget>
    </div>
  </div>
</template>

<script>

import { bus } from '../main';
import InfoWidget from './InfoWidget';
import ConsoleWidget from './ConsoleWidget';
import ButtonsWidget from './ButtonsWidget';
import TextWidget from './TextWidget';
import { SimpleSVG } from 'vue-simple-svg';
import svgInfo from '../assets/info.svg';
import svgConsole from '../assets/console.svg';
import svgButtons from '../assets/buttons.svg';
import svgtext from '../assets/text.svg';

export default {
  name: "InfoBlock",
  props: ["protocol"],
  data() {
    return {
      tabs: [
        {
          id: 0,
          text: 'Инфа',
          svg: svgInfo,
        },
        {
          id: 1,
          text: 'Консоль',
          svg: svgConsole,
        },
        // {
        //   id: 2,
        //   text: 'Кнопки',
        //   svg: svgButtons,
        // },
        // {
        //   id: 3,
        //   text: 'Текст',
        //   svg: svgtext,
        // },
      ],
      selectedTabId: 0,
    };
  },
  mounted() {

  },
  methods: {
    turnTab(tab) {
      this.selectedTabId = tab.id;
    },
  },
  components: {
    InfoWidget,
    ConsoleWidget,
    ButtonsWidget,
    TextWidget,
    SimpleSVG,
  }
};
</script>

<style scoped>

.info-frame {
  margin-top: 40px; 
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 12rem;
  border: solid 1px var(--mainColor);
  border-radius: 8px;
}

.tab {
  display: flex;
  height: 2rem;
  flex-direction: row;
  font-size: 0.8em;
  border-bottom: 1px solid var(--mainColor);
}

.tab__item {
  margin: 10px 0 10px 20px; 
}

.tab__item:hover {
  border-radius: 50%;
  box-shadow: 0 0 10px 0px var(--secondColor);
}

.tab__item:not(hover), btn:not(active) {
   transition: 0.3s;
}

.tab__item_selected {
  border-radius: 50%;
  box-shadow: 0 0 10px 0px var(--mainColor);
}

.widget {
  margin: 15px;
  width: 90%;
  height: 8rem;
}

</style>

<template>
  <div class="info-frame">
    <div class="tab">
      <a class="tab__item" v-for="tab in tabs" :key="tab.id" v-on:click="turnTab($event, tab.id)">{{ tab.text }}</a>
      <!-- <SimpleSVG
        :filepath="imageSource"
        :fill="'#2863b3'"
        :stroke="'#2863b3'"
        :width="'400px'"
        :height="'400px'"
      /> -->
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
import svg1 from '../assets/console.svg';

export default {
  name: "InfoBlock",
  props: ["protocol"],
  data() {
    return {
      tabs: [
        {
          id: 0,
          text: 'Инфа',
        },
        {
          id: 1,
          text: 'Консоль',
        },
        {
          id: 2,
          text: 'Кнопки',
        },
        {
          id: 3,
          text: 'Текст',
        },
      ],
      selectedTabId: 0,
      selectedTab: null,
      imageSource: svg1,
    };
  },
  mounted() {
    this.selectedTab = this.$el.getElementsByClassName('tab__item')[0];
    this.selectedTab.classList.add("tab__item_selected");
  },
  methods: {
    turnTab(event, id) {
      if (this.selectedTab) {
        this.selectedTab.classList.remove("tab__item_selected");
      }
      event.target.classList.add("tab__item_selected");
      this.selectedTab = event.target;
      this.selectedTabId = id;
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
  margin: 10px 0 8px 10px; 
}

.tab__item_selected {
  border: 1px solid #2863b3;
  border-radius: 4px;
}

.widget {
  margin: 15px;
  width: 90%;
  height: 8rem;
}

</style>

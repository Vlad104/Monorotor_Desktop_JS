<template>
  <div id="main">
    <input type="text" value="Объём">
    <input type="text" value="Подача">
    <input type="text" value="Ускорение">
    <input type="text" value="Отношение А">
    <input type="text" value="Отношение Б">
    <input type="text" value="Передаточное А">
    <input type="text" value="Передаточное Б">
  </div>
</template>

<script>

  export default {
    name: 'main-page',
    methods: {
    }
  }
</script>

<style>

#main {
    display: flex;
    flex-direction: column;
    width: 200px;
}

#main > * {margin: 10px 0 10px 0;}

</style>

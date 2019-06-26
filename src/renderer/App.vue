<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'monorotorjs'
  }
</script>

<style>

html {
  font-size: 20px;
}

body {
  background-color: #181E24;
}

* {
  outline: none;
}

a {
  text-decoration: none;
  user-select: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2863b3;
  margin-top: 60px;
}

</style>

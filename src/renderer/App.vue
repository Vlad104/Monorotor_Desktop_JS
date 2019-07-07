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

/* :root {
    --backgroundColor: #181E24;
    --mainColor: #bb6222;
    --secondColor: #2863b3;
} */

:root {
    --backgroundColor: #181E24;
    --backgroundLightColor: rgb(45, 57, 68);
    --mainColor: #FFFFFF;
    --secondColor: #2863b3;
    --secondDarkColor: #1b4279;
}

html {
  font-size: 20px;
}

body {
  background-color: var(--backgroundColor);
}

* {
  outline: none;
}

*::selection {
  background: var(--mainColor);
}

a {
  text-decoration: none;
  user-select: none;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button
{
  -webkit-appearance: none;
  margin: 0;
}

textarea {
  resize: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--secondColor);
  margin-top: 30px;
}

</style>

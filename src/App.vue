<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>export default {name: 'App'}</script>

<style>
#app {
  width: 70rem;
  margin: 4rem auto;
  padding: 4rem;
  border-radius: 0.3rem;
  background: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.10),
              0 0 3rem rgba(0, 0, 0, 0.03);
}
body {
  background: rgb(245,246,246);
  background: -moz-linear-gradient(top, rgba(245,246,246,1) 0%, rgba(219,220,226,1) 21%, rgba(184,186,198,1) 49%, rgba(221,223,227,1) 80%, rgba(245,246,246,1) 100%);
  background: -webkit-linear-gradient(top, rgba(245,246,246,1) 0%,rgba(219,220,226,1) 21%,rgba(184,186,198,1) 49%,rgba(221,223,227,1) 80%,rgba(245,246,246,1) 100%);
  background: linear-gradient(to bottom, rgba(245,246,246,1) 0%,rgba(219,220,226,1) 21%,rgba(184,186,198,1) 49%,rgba(221,223,227,1) 80%,rgba(245,246,246,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5f6f6', endColorstr='#f5f6f6',GradientType=0 );
}
</style>

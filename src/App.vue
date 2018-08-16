<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      load: false
    };
  },
  mounted() {
    this.$event.$on("errorNetWork", msg => {
      this.$message.error(msg);
    });

    this.$event.$on("actionload", flag => {
      this.load = flag;
    });
  }
};
</script>

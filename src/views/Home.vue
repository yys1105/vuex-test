<template>
  <div class="home">
    home
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters({
      data: "user/data"
    })
  },
  methods: {
    ...mapActions({
      getDatas: "user/getList"
    })
  },
  created(){
    this.getDatas()
  }
};
</script>

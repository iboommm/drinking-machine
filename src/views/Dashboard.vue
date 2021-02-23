<template>
  <div class="row">
    <div class="col-4" v-for="item in machineList" :key="item.id">
      <ListLessThan10 :machineId="item.id" />
    </div>
  </div>
</template>

<script>
import ListLessThan10 from '../views/stock/ListLessThan10';
import { ActionGet } from '../storage/api';

export default {
  name: 'Dashboard',
  components: {
    ListLessThan10,
  },
  data() {
    return {
      machineList: [],
    };
  },
  methods: {
    async fetchList() {
      this.machineList = await ActionGet('machines');
    },
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>

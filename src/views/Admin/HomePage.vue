<template>
  <admin-navbar />
</template>

<script>

import AdminNavbar from './Components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    'admin-navbar': AdminNavbar,
  },
  setup() {},
  data() {
    return {
      username: localStorage.getItem('username'),
    };
  },
};
</script>

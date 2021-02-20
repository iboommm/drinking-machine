<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">Dashboard</a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category">Machine</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category"
                >Category</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/items">Items</router-link>
            </li>
             <li class="nav-item">
              <router-link class="nav-link" to="/items">Stock</router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            Welcome &nbsp; <b>{{ username }}</b> &nbsp;
            <router-link class="btn btn-primary btn-sm ml-2" to="/sign-out"
              >Sign out</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {},
  data() {
    return {
      username: localStorage.getItem('username'),
    };
  },
};
</script>

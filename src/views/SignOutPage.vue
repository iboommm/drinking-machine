<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center">
      <div class="col-md-6 contents">
        <div class="row align-items-center h-100 justify-content-center">
          <div class="col-md-12">
            <div class="form-block">
              <div class="mb-4">
                <h3 class="text-center">
                  <strong>Drinking Management System</strong>
                </h3>
              </div>
              <div class="form-group first text-start"></div>
              <div class="alert alert-success mt-2" role="alert" v-if="1">
                Sign out completed!, redirect in 3 seconds.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sign out",
  mounted() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user-token');
    setTimeout(() => {
      location.reload();
    }, 3000);
  },
  methods() {},
};
</script>

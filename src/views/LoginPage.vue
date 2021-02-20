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
              <div class="form-group first text-start">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="loginFrom.username"
                />
              </div>
              <div class="form-group last mb-4 text-start">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="loginFrom.password"
                />
              </div>
              <input
                type="submit"
                value="Log In"
                @click="onClickSubmit"
                class="btn btn-pill text-white btn-block btn-primary"
              />
              <div v-bind:class="{ 'alert-success': loginFrom.valid, 'alert-danger': !loginFrom.valid }" class="alert mt-2" role="alert" v-if="loginFrom.msg">
                {{ loginFrom.msg }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useLoginForm from "../hooks/useAuth";

export default {
  name: "LoginPage",
  setup() {
    const { loginFrom, onClickSubmit } = useLoginForm.useLoginForm({
      username: "",
      password: "",
    });

    return { loginFrom, onClickSubmit };
  },
  methods() {},
};
</script>

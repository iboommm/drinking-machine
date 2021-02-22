<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <CAlert v-if="result.msg" :color="!result.valid ? 'warning':'success'" closeButton>
                    {{ result.msg }}
                  </CAlert>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username"
                    v-model="username"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton
                        @click="onClickSubmit"
                        color="primary"
                        class="px-4"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <CButton color="light" variant="outline" size="lg">
                  Drinking Machine
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { ActionSignIn } from "../../storage/auth";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      result: {}
    };
  },
  methods: {
    async onClickSubmit() {
      this.result = await ActionSignIn(this.username, this.password);
      console.log(this.result.valid);
      if (this.result.valid) {
        location.reload();
      }
    },
  },
};
</script>

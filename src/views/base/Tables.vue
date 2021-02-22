<template>
  <div>
    <CRow>
      <CCol lg="6">
        <CTableWrapper :items="getShuffledUsersData()">
          <template #header>
            <CIcon name="cil-grid" /> Simple Table
            <div class="card-header-actions">
              <a
                href="https://coreui.io/vue/docs/components/nav"
                class="card-header-action"
                rel="noreferrer noopener"
                target="_blank"
              >
                <small class="text-muted">docs</small>
              </a>
            </div>
          </template>
        </CTableWrapper>
      </CCol>

      <CCol lg="6">
        <CTableWrapper
          :items="getShuffledUsersData()"
          striped
          caption="Striped Table"
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol lg="6">
        <CTableWrapper
          :items="getShuffledUsersData()"
          small
          caption="Condensed Table"
        />
      </CCol>

      <CCol lg="6">
        <CTableWrapper
          :items="getShuffledUsersData()"
          fixed
          border
          caption="Bordered Table"
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="getShuffledUsersData()"
          hover
          striped
          border
          small
          fixed
          caption="Combined All Table"
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="getShuffledUsersData()"
          hover
          striped
          border
          small
          fixed
          dark
          caption="Combined All dark Table"
        />
      </CCol>
    </CRow>
    <button @click="onClick" class="btn btn-primary">Test</button>
  </div>
</template>

<script>
import CTableWrapper from "./Table.vue";
import usersData from "../users/UsersData";

export default {
  name: "Tables",
  components: { CTableWrapper },
  methods: {
    onClick() {
      console.log(this.list);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getShuffledUsersData() {
      return this.shuffleArray(usersData.slice(0));
    },

    getList() {
      return new Promise(function (resolve, reject) {
        resolve(usersData)
      });
    },
  },
  data() {
    return { list: [] };
  },
  async created() {
    console.log("before getList");
    this.list = await this.getList();
    console.log("after getList");
  },
};
</script>

<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper
          :items="list"
          :fields="fields"
          :caption="caption"
          :editAction="onClickEditBtn"
          :canDeleteItem="false"
        />
      </CCol>
    </CRow>
    <button @click="onClickAddBtn()" class="btn btn-primary">
      Add
    </button>

    <modal ref="forms">
      <template v-slot:header>
        <h1>{{ editMode }} {{ caption }}</h1>
      </template>

      <template v-slot:body>
        <CCard>
          <CCardBody>
            <CInput
              label="Name"
              placeholder="Machine name"
              v-model="item.name"
            />
            <CInput
              label="IP"
              placeholder="Machine IP"
              v-model="item.ip_address"
            />
            <CInput
              label="Location"
              placeholder="Machine location"
              v-model="item.location"
            />
          </CCardBody>
        </CCard>
      </template>

      <template v-slot:footer>
        <div>
          <button class="btn btn-success mr-1" @click="onClickSubmit">
            Save
          </button>
          <button class="btn btn-danger" @click="closeModal">
            Cancel
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue';
import Modal from '../base/Modal';
import { ActionGet, ActionPut, ActionPost } from '../../storage/api';

export default {
  name: 'List',
  components: { CTableWrapper, Modal },
  methods: {
    onClickAddBtn() {
      this.$refs.forms.openModal();
      this.editMode = 'Add';
      this.item = {};
    },
    onClickEditBtn(item) {
      this.$refs.forms.openModal();
      this.editMode = 'Edit';
      this.item = item;
    },
    closeModal() {
      this.$refs.forms.closeModal();
    },
    async fetchList() {
      this.list = await ActionGet(this.table);
      console.log(this.list);
    },
    async onClickSubmit() {
      if (this.editMode === 'Add') {
        await ActionPut(this.table, this.item);
        await this.fetchList();
        this.closeModal();
      }
      if (this.editMode === 'Edit') {
        await ActionPost(this.table, this.item);
        await this.fetchList();
        this.closeModal();
      }
    },
  },
  data() {
    return {
      caption: 'Machine',
      table: 'machines',
      list: [],
      fields: ['id', 'name', 'ip_address', 'location', 'edit'],
      showModal: false,
      item: {},
    };
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>

<style lang="scss">
.overflow-hidden {
  // overflow: hidden;
}
</style>

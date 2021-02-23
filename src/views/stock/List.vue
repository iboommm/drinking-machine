<template>
  <div>
    <button
      v-for="machine in machineList"
      :key="machine.name"
      class="btn btn-primary mr-2"
      @click="onClickMachine(machine.id)"
    >
      {{ machine.name }}
    </button>
    <CRow>
      <CCol lg="12">
        <CTableWrapper
          :items="list"
          :fields="fields"
          :caption="caption"
          :editAction="onClickEditBtn"
          :deleteAction="onClickDelete"
          :categoryList="categoryList"
          :itemList="itemList"
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
            <CSelect
              label="Machine"
              :options="machines"
              @change="handleMachine($event)"
              v-model="machineEvent"
              :value.sync="machineEvent"
              placeholder="Please select"
            />

            <CSelect
              label="Item"
              :options="items"
              @change="handleItem($event)"
              v-model="itemEvent"
              :value.sync="itemEvent"
              placeholder="Please select"
            />

            <CInput label="Name" placeholder="Amount" v-model="item.amount" />
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
import {
  ActionGet,
  ActionPut,
  ActionPost,
  ActionDelete,
  ActionUpload,
} from '../../storage/api';
import { GetStock } from '../../storage/stock';

export default {
  name: 'List',
  components: { CTableWrapper, Modal },
  methods: {
    onClickAddBtn() {
      this.$refs.forms.openModal();
      this.editMode = 'Add';
      this.item = {};
      this.uploadFinished = false;
      this.itemEvent = null;
      this.machineEvent = null;
    },
    onClickEditBtn(item) {
      this.$refs.forms.openModal();
      this.editMode = 'Edit';
      this.item = item;
    },
    closeModal() {
      this.$refs.forms.closeModal();
    },
    async onClickUpload() {
      this.item.image = await ActionUpload(this.file);
      this.uploadFinished = true;
    },
    async fetchList() {
      this.categoryList = await ActionGet(this.category_table);
      this.itemList = await ActionGet('items');
      this.machineList = await ActionGet('machines');
      this.items = this.itemList.map((x) => x.name);
      this.machines = this.machineList.map((x) => x.name);
      this.category = this.categoryList.map((x) => x.name);
      this.list = await GetStock(this.machineId);
    },
    async onClickSubmit() {
      if (this.editMode === 'Add') {
        await ActionPut(this.table, this.item);
      }
      if (this.editMode === 'Edit') {
        await ActionPost(this.table, this.item);
      }
      await this.fetchList();
      this.closeModal();
    },
    handleMachine(e) {
      this.item.machine_id = this.machineList.find(
        (x) => x.name === e.target.value
      ).id;
    },
    handleItem(e) {
      this.item.item_id = this.itemList.find(
        (x) => x.name === e.target.value
      ).id;
    },
    async onClickDelete(id) {
      this.item = { id };
      await ActionDelete(this.table, this.item);
      await this.fetchList();
      this.closeModal();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async onClickMachine(id) {
      this.machineId = id;
      this.list = await GetStock(this.machineId);
    }
  },
  data() {
    return {
      caption: 'Items',
      table: 'stock',
      category_table: 'category',
      list: [],
      fields: ['id', 'item_id', 'amount'],
      showModal: false,
      item: {},
      files: null,
      category: [],
      categoryList: [],
      uploadFinished: false,
      itemEvent: null,
      machineEvent: '',
      machineId: 1,
      machineList: [],
      itemList: [],
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

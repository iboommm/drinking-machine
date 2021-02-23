<template>
  <div>
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
          :tableFilter="false"
        />
      </CCol>
    </CRow>
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
  props: {
    machineId: Number
  },
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
      this.list = this.list.filter(x => x.amount < 10);
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

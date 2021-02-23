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
            <CInput label="Name" placeholder="Item name" v-model="item.name" />
            <CTextarea
              label="Detail"
              placeholder="Detail..."
              rows="2"
              v-model="item.detail"
            />
            <CInput label="Price" placeholder="Price" v-model="item.price" />
            <CSelect
              label="Category"
              :options="category"
              @change="handleCategory($event)"
              v-model="categoryEvent"
              :value.sync="categoryEvent"
              placeholder="Please select"
            /> 
            Image<br />
            <input
              v-if="!uploadFinished"
              type="file"
              id="file"
              ref="file"
              @change="handleFileUpload()"
            />

            <button
              v-if="!uploadFinished"
              @click="onClickUpload()"
              class="btn btn-sm btn-primary"
            >
              Upload
            </button>
            <img :src="'http://localhost:5000' + item.image" alt="">
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

export default {
  name: 'List',
  components: { CTableWrapper, Modal },
  methods: {
    onClickAddBtn() {
      this.$refs.forms.openModal();
      this.editMode = 'Add';
      this.item = {};
      this.uploadFinished = false;
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
      this.category = this.categoryList.map((x) => x.name);
      this.list = await ActionGet(this.table);
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
    handleCategory(e) {
      this.item.category = this.categoryList.find(x => x.name === e.target.value).id;
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
  },
  data() {
    return {
      caption: 'Items',
      table: 'items',
      category_table: 'category',
      list: [],
      fields: ['id', 'image', 'name', 'category', 'price', 'edit'],
      showModal: false,
      item: {},
      files: null,
      category: [],
      categoryList: [],
      uploadFinished: false,
      categoryEvent: null
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

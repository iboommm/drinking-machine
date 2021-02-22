<template>
  <CCard>
    <CCardHeader>
      <slot name="header"> <CIcon name="cil-grid" /> {{ caption }} </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        itemsPerPageSelect
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
        tableFilter
        sorter
      >
        <template #edit="{ item }">
          <td>
            <button
              class="btn btn-sm btn-primary mr-1"
              @click="editAction(item)"
            >
              Edit
            </button>
            <button v-if="canDeleteItem"
              class="btn btn-sm btn-danger"
              @click="deleteAction(item.id)"
            >
              Delete
            </button>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default() {
        return ['username', 'registered', 'role', 'status'];
      },
    },
    caption: {
      type: String,
      default: 'Table',
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
    editAction: Function,
    deleteAction: Function,
    canDeleteItem: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getBadge(status) {
      return status === 'Active'
        ? 'success'
        : status === 'Inactive'
        ? 'secondary'
        : status === 'Pending'
        ? 'warning'
        : status === 'Banned'
        ? 'danger'
        : 'primary';
    },
  },
};
</script>

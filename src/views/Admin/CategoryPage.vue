<template>
  <div class="card">
    <h5 class="card-header text-uppercase">
      {{ editMode ? editMode : '' }} {{ table }}
    </h5>
    <div class="card-body">
      <!-- table -->
      <div id="table" v-if="!form.editMode">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.response?.result" :key="item.name">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>
                <a
                  @click="
                    editMode = 'edit';
                    form = item;
                  "
                  class="btn btn-primary btn-sm mr-1"
                  >Edit</a
                >
                <router-link
                  class="btn btn-danger btn-sm mr-1"
                  :to="'/home/' + table + '/delete/' + item.id"
                  >Remove</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <router-link class="btn btn-primary" :to="'/home/' + table + '/add/'"
            >Add</router-link
          >
        </p>
      </div>
      <!-- table -->
      <!-- add / edit -->
      <div id="form" v-if="form.editMode" class="mb-3">
        <label class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="name"
          v-model="form.name"
        />
        <br />
        <a @click="onClickSubmit({ table , method : 'post', form})" class="btn btn-primary mr-1">Submit</a>
         <a @click="form.editMode = false" class="btn btn-danger">Cancel</a>
      </div>
      <!-- add / edit -->
    </div>
  </div>
</template>

<script>
import useConnection from '../../hooks/useAPI';

export default {
  name: 'CategoryPage',
  setup() {
    const table = 'category';
    const { data, to } = useConnection.useConnection({});

    const { form, onClickSubmit } = useConnection.useForm({});

    return { table, data, to, form, onClickSubmit };
  },
  mounted() {
    if (!this.$route.params.mode) {
      this.to({ path: 'cart/category' });
    }
  },
};
</script>

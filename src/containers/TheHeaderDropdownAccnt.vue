<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem @click="onClickSignOut">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>

import { ActionSignOut } from '../storage/auth'

export default {
  name: 'TheHeaderDropdownAccnt',
  methods: {
    async onClickSignOut() {
      await ActionSignOut();
      location.reload();
    },
  },
  data () {
    return { 
      itemsCount: 42
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
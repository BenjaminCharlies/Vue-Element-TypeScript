<template>
  <session-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SessionDetail from './compoents/SeesionDetail.vue'

@Component({
  components: {
    SessionDetail
  }
})
export default class CreateSessionComponent extends Vue {}
</script>

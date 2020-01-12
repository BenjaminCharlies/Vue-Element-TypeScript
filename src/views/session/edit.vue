<template>
  <session-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SessionDetail from './components/SessionDetail'

@Component({
  components: {
    SessionDetail
  }
})
export default class EditSessionComponent extends Vue {}
</script>

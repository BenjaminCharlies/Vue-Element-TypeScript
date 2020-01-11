import { Component, Vue } from 'vue-property-decorator'
import { _Client } from '@/api-client'
import { SessionModel } from '@/api-client/client'
import Pagination from '@/components/Pagination/index.vue'
@Component({
  components: {
    Pagination
  }
})
export default class SessionComponent extends Vue {
  private listLoading: boolean = false
  private sessionList: SessionModel[] = []
  private total: number = 0
  private searchParames = {
    sessionId: undefined,
    cityId: undefined,
    productId: undefined,
    status: undefined,
    examDate: undefined,
    isCancellationRequest: undefined,
    pageIndex: 1,
    pageSize: 10,
    sorts: undefined,
    filters: undefined
  }
  private created() {
    // @ts-ignore
    this.getSessionList().then()
  }
  private async getSessionList() {
    this.listLoading = true
    // @ts-ignore
    const { list, recordCount } = await _Client.sessionClient.search(...Object.values(this.searchParames))
    this.sessionList = list
    this.total = recordCount
    this.listLoading = false
  }
}

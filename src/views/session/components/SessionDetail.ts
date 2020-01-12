import { Component, Vue, Prop } from 'vue-property-decorator'
import { SessionModel, ProductFeeMatrixModel, CityModel, VenueModel, FeeMatrixSubjectModel } from '@/api-client/client'
import moment from 'moment'
import { _Client } from '@/api-client'
@Component
export default class SessionDetailComponent extends Vue {
  @Prop() isEdit!: boolean
  private session: SessionModel = new SessionModel()
  private productList: ProductFeeMatrixModel[] = []
  private cityList: CityModel[] = []
  private venueList: VenueModel[] = []
  private subjectList: FeeMatrixSubjectModel[] = [];
  private examTime = null
  private productId: string = ''
  private registrationTime = null
  private moment = moment
  private examDatePickerOptions = {
    disabledDate(time: Date) {
      return time.getTime() < Date.now() - 8.64e7
    }
  }
  private registrationTimePickerOptions = {
    disabledDate: (time: Date) => {
      let result = true
      if (this.session.examDate) {
        let date = moment(moment(this.session.examDate).format('YYYY-MM-DD'))
        result = moment(moment(time).format('YYYY-MM-DD')) >= date
      }
      return result
    }
  }
  private created() {
    if (!this.isEdit) {
      this.$set(this.session, 'product', { id: '' })
      this.$set(this.session, 'city', { id: '' })
      this.$set(this.session, 'venue', { id: '' })
      this.$set(this.session, 'sessionSubjects', [])
    }
  }
  private handleExamDateChange(examDate: Date): void {
    _Client.productClient.getBySessionDate(examDate).then(products => {
      this.productList = products
    })
  }
  private handleExamTimeChange(examTime: Date[]): void {
    if (examTime) {
      this.session.startTime = moment(examTime[0]).format('HH:mm')
      this.session.endTime = moment(examTime[1]).format('HH:mm')
    } else {
      this.session.startTime = ''
      this.session.endTime = ''
    }
  }
  private handleProductChange(productId: string): void {
    // get the city under the product
    _Client.cityClient.getAll(productId).then(citys => {
      this.cityList = citys
    })
    // get the feeMartix under the product
    let product = this.productList.filter((item) => item.id === productId)
    _Client.feeMatrixClient.getById(product[0].feeMatrixId).then(feeMatrix => {
      // set the subject under the product
      if (feeMatrix.feeMatrixSubjects) {
        this.session.sessionSubjects = []
        this.subjectList = feeMatrix.feeMatrixSubjects
        this.subjectList.map((subject) => {

        })
      }
    })
  }
  private handleCityChange(cityId: string): void {
    _Client.venueClient.getByCityId(cityId).then(venues => {
      this.venueList = venues
    })
  }
  private handleSubjectListChange(val: any) {
    console.log(val)
    console.log(this.session)
  }
  private handleExclusiveChange() {
    if (this.session.isExclusiveSession) {
      this.session.pin = Math.random().toFixed(6).slice(-6)
    } else {
      this.session.pin = ''
    }
  }
}

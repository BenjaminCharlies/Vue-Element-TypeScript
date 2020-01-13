import { Component, Vue, Prop } from 'vue-property-decorator'
import { SessionModel, ProductFeeMatrixModel, CityModel, VenueModel, FeeMatrixSubjectModel, SessionLateEntryChargeModel } from '@/api-client/client'
import moment from 'moment'
import { _Client } from '@/api-client'
import { Form } from 'element-ui'
@Component
export default class SessionDetailComponent extends Vue {
  @Prop() isEdit!: boolean
  private sessionForm: SessionModel = new SessionModel()
  private productList: ProductFeeMatrixModel[] = []
  private cityList: CityModel[] = []
  private venueList: VenueModel[] = []
  private subjectList: FeeMatrixSubjectModel[] = []
  private productId: string = ''
  private moment = moment
  private examDatePickerOptions = {
    disabledDate(time: Date) {
      return time.getTime() < Date.now() - 8.64e7
    }
  }
  private registrationTimePickerOptions = {
    disabledDate: (time: Date) => {
      let result = true
      if (this.sessionForm.examDate) {
        let date = moment(moment(this.sessionForm.examDate).format('YYYY-MM-DD'))
        result = moment(moment(time).format('YYYY-MM-DD')) >= date
      }
      return result
    }
  }
  private sessionRules = {
    examDate: [ { required: true, message: 'Please choose exam date', trigger: 'blur' } ],
    examTime: [ { required: true, message: 'Please choose exam time', trigger: 'blur' } ],
    'product.id': [ { required: true, message: 'Please choose product' } ],
    'city.id': [ { required: true, message: 'Please choose city' } ],
    seat: [ { required: true, message: 'please input seat', trigger: 'change' } ],
    registrationTime: [ { required: true, message: 'Please choose Registration Time', trigger: 'blur' } ]

  }
  private created() {
    if (!this.isEdit) {
      this.$set(this.sessionForm, 'examDate', null)
      this.$set(this.sessionForm, 'product', { id: '' })
      this.$set(this.sessionForm, 'city', { id: '' })
      this.$set(this.sessionForm, 'venue', { id: '' })
      this.$set(this.sessionForm, 'sessionSubjects', [])
    }
  }
  private handleExamDateChange(examDate: Date): void {
    _Client.productClient.getBySessionDate(examDate).then(products => {
      this.productList = products
    })
  }
  private handleExamTimeChange(examTime: Date[]): void {
    if (examTime) {
      this.sessionForm.startTime = this.sessionForm.examTime[0] = moment(examTime[0]).format('HH:mm')
      this.sessionForm.endTime = this.sessionForm.examTime[1] = moment(examTime[1]).format('HH:mm')
    } else {
      this.sessionForm.startTime = ''
      this.sessionForm.endTime = ''
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
        this.sessionForm.sessionSubjects = []
        this.subjectList = feeMatrix.feeMatrixSubjects
        this.subjectList.map((subject) => {

        })
      }
      if (feeMatrix.feeMatrixLateEntryCharges) {
        this.sessionForm.sessionLateEntryCharges = []
        for (let i = 0; i < feeMatrix.feeMatrixLateEntryCharges.length; i++) {
          let lateStage: { stage: number, name: string, fee: number, startDate: null | Date, endDate: null | Date, id: string } = {
            stage: feeMatrix.feeMatrixLateEntryCharges[i].stage,
            name: '',
            fee: feeMatrix.feeMatrixLateEntryCharges[i].fee,
            id: feeMatrix.feeMatrixLateEntryCharges[i].id,
            startDate: null,
            endDate: null
          }
          if (i === 0) {
            lateStage.name = 'Standard Stage'
          } else {
            lateStage.name = 'Stage' + i
          }
          this.sessionForm.sessionLateEntryCharges.push(lateStage as unknown as SessionLateEntryChargeModel)
        }
      }
    })
  }
  private handleCityChange(cityId: string): void {
    _Client.venueClient.getByCityId(cityId).then(venues => {
      this.venueList = venues
    })
  }
  private handleSubjectListChange(val: any) {
  }
  private handleRegistrationTimeChange(registrationTime: Date[]): void {
    if (registrationTime) {
      this.sessionForm.publishStartTime = moment(this.sessionForm.registrationTime[0]).toDate()
      this.sessionForm.publishEndTime = moment(this.sessionForm.registrationTime[1]).toDate()
      this.sessionForm.sessionLateEntryCharges[0].startDate = registrationTime[0]
      this.sessionForm.sessionLateEntryCharges[this.sessionForm.sessionLateEntryCharges.length - 1].endDate = registrationTime[1]
    } else {
      this.sessionForm.publishStartTime = null
      this.sessionForm.publishEndTime = null
    }
  }
  private handleLateStageTimeChange(endDate: Date, index: number) {
    this.sessionForm.sessionLateEntryCharges[index + 1].startDate = endDate
  }
  private handleExclusiveChange() {
    if (this.sessionForm.isExclusiveSession) {
      this.sessionForm.pin = Math.random().toFixed(6).slice(-6)
    } else {
      this.sessionForm.pin = ''
    }
  }
  private handleSubmit(): void {
    (this.$refs.sessionForm as Form).validate((valid) => {
      if (valid) {
        console.log(this.sessionForm)
      } else {
        console.log(false)
        return false
      }
    })
    console.log(this.sessionForm)
  }
}

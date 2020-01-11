<template>
  <div class="pages-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Session</span>
      </div>
      <el-form ref="ruleForm" :model="session" :rules="rules">
        <el-form-item label="Choose ExamDate" prop="examDate">
          <el-date-picker v-model="session.examDate" placeholder="examDate" :disabled-date="(date) => date.isafter(moment())" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SessionModel, ProductModel } from '../../../api-client/client'
import moment from 'moment'
@Component
export default class SessionDetailComponent extends Vue {
    private session: SessionModel = new SessionModel()
    private moment = moment;
    private rules = {
      examDate: [{ type: 'date', required: true, message: 'Please Choose ExamDate', trigger: 'change' }]
    //   region: [
    //     { required: true, message: '请选择活动区域', trigger: 'change' }
    //   ],
    //   date1: [
    //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    //   ],
    //   date2: [
    //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    //   ],
    //   type: [
    //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    //   ],
    //   resource: [
    //     { required: true, message: '请选择活动资源', trigger: 'change' }
    //   ],
    //   desc: [
    //     { required: true, message: '请填写活动形式', trigger: 'blur' }
    //   ]
    }
    // private submitForm(formName: string) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
    // private resetForm(formName: tring) {
    //   this.$refs[formName].resetFields()
    // }
}
</script>

<style lang="scss">
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>

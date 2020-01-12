<template>
  <div class="pages-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Session</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">
          Back
        </el-button>
      </div>
      <el-form ref="ruleForm" :model="session" class="session-form" label-width="300px">
        <el-form-item label="Choose Exam Date:" required>
          <el-date-picker v-model="session.examDate" placeholder="Exam Date" :picker-options="examDatePickerOptions" @change="handleExamDateChange" />
        </el-form-item>
        <el-form-item label="Choose Exam Time:" required>
          <el-time-picker
            v-model="examTime"
            format="HH:mm"
            is-range
            :default-value="[new Date(2020,1,1,0,0),new Date(2020,1,1,23,59)]"
            range-separator="-"
            start-placeholder="Start Time"
            end-placeholder="End Time"
            @change="handleExamTimeChange"
          />
        </el-form-item>
        <el-form-item label="Select Product:" required>
          <el-select v-model="session.product.id" no-data-text="Not found product" placeholder="Product" @change="handleProductChange">
            <el-option
              v-for="product in productList"
              :key="product.id"
              :label="product.productName"
              :value="product.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Select City:" required>
          <el-select v-model="session.city.id" no-data-text="Not found City" placeholder="City" @change="handleCityChange">
            <el-option
              v-for="city in cityList"
              :key="city.id"
              :label="city.name"
              :value="city.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Select Venue:">
          <el-select v-model="session.venue.id" no-data-text="Not found Venue" placeholder="Venue">
            <el-option
              v-for="venue in venueList"
              :key="venue.id"
              :label="venue.name"
              :value="venue.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Available Seats:" required>
          <el-input-number v-model="session.seat" controls-position="right" :min="0" :max="999" />
        </el-form-item>
        <el-form-item v-if="subjectList.length > 0" label="Subjects:">
          <el-checkbox-group v-model="session.sessionSubjects" @change="handleSubjectListChange">
            <template v-for="subject in subjectList">
              <div :key="subject.subjectName">
                <el-checkbox v-model="subject.subjectId" :label="subject.subjectId">
                  {{ subject.subject.subjectName + '&emsp;&emsp;¥' + subject.total }}
                </el-checkbox>
              </div>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Set Registration Time:" required>
          <el-date-picker
            v-model="registrationTime"
            format="yyyy-MM-dd HH:mm"
            :default-time="['00:00:00','23:59:59']"
            :picker-options="registrationTimePickerOptions"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="Exclusive Session">
          <el-col :span="1">
            <el-switch v-model="session.isExclusiveSession" @change="handleExclusiveChange" />
          </el-col>
          <el-col v-show="session.isExclusiveSession" :span="2" style="margin-left:10px">
            <el-input v-model="session.pin" size="mini" :disabled="true" />
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" src="./SessionDetail.ts"></script>
<style lang="scss" src="./SessionDetail.scss" scoped></style>

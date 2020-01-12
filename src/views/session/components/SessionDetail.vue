<template>
  <div class="pages-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Session</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">
          Back
        </el-button>
      </div>
      <el-form ref="sessionForm" :model="sessionForm" :rules="sessionRules" class="session-form" label-width="300px">
        <el-form-item label="Choose Exam Date:" prop="examDate">
          <el-date-picker v-model="sessionForm.examDate" placeholder="Exam Date" :picker-options="examDatePickerOptions" @change="handleExamDateChange" />
        </el-form-item>
        <el-form-item label="Choose Exam Time:" prop="examTime">
          <el-time-picker
            v-model="sessionForm.examTime"
            format="HH:mm"
            is-range
            :default-value="[new Date(2020,1,1,0,0),new Date(2020,1,1,23,59)]"
            range-separator="-"
            start-placeholder="Start Time"
            end-placeholder="End Time"
            @change="handleExamTimeChange"
          />
        </el-form-item>
        <el-form-item label="Select Product:" prop="product.id">
          <el-select v-model="sessionForm.product.id" no-data-text="Not found product" placeholder="Product" @change="handleProductChange">
            <el-option
              v-for="product in productList"
              :key="product.id"
              :label="product.productName"
              :value="product.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Select City:" prop="city.id">
          <el-select v-model="sessionForm.city.id" no-data-text="Not found City" placeholder="City" @change="handleCityChange">
            <el-option
              v-for="city in cityList"
              :key="city.id"
              :label="city.name"
              :value="city.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Select Venue:">
          <el-select v-model="sessionForm.venue.id" no-data-text="Not found Venue" placeholder="Venue">
            <el-option
              v-for="venue in venueList"
              :key="venue.id"
              :label="venue.name"
              :value="venue.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Available Seats:" prop="seat">
          <el-input-number v-model="sessionForm.seat" controls-position="right" :min="0" :max="999" />
        </el-form-item>
        <el-form-item v-if="subjectList.length > 0" label="Subjects:">
          <el-checkbox-group v-model="sessionForm.sessionSubjects" @change="handleSubjectListChange">
            <template v-for="subject in subjectList">
              <div :key="subject.subjectName">
                <el-checkbox v-model="subject.subjectId" :label="subject.subjectId">
                  {{ subject.subject.subjectName + '&emsp;&emsp;¥' + subject.total }}
                </el-checkbox>
              </div>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Set Registration Time:" prop="registrationTime">
          <el-date-picker
            v-model="sessionForm.registrationTime"
            format="yyyy-MM-dd HH:mm"
            :default-time="['00:00:00','23:59:59']"
            :picker-options="registrationTimePickerOptions"
            type="datetimerange"
            range-separator="-"
            start-placeholder="Start Date"
            end-placeholder="End Date"
          />
        </el-form-item>
        <el-form-item label="Exclusive Session">
          <el-col :span="1">
            <el-switch v-model="sessionForm.isExclusiveSession" @change="handleExclusiveChange" />
          </el-col>
          <el-col v-show="sessionForm.isExclusiveSession" :span="2" style="margin-left:10px">
            <el-input v-model="sessionForm.pin" size="mini" :disabled="true" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">
            Create
          </el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" src="./SessionDetail.ts"></script>
<style lang="scss" src="./SessionDetail.scss" scoped></style>

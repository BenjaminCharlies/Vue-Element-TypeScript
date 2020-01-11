<template>
  <div class="pages-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Session</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          Create Session
        </el-button>
      </div>
      <div class="filter-container">
        <el-input style="width: 200px;" class="filter-item" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getSessionList">
          search
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          add
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-download">
          export
        </el-button>
      </div>
      <el-table v-loading="listLoading" :data="sessionList">
        <el-table-column label="Product" prop="product.productName" />
        <el-table-column label="City" prop="city.name" />
        <el-table-column label="ExamDate" prop="examDate">
          <template slot-scope="scope">
            {{ scope.row.examDate | moment('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Action" width="100">
          <template>
            <router-link :to="'/session/create'">
              <el-button
                type="text"
                size="small"
              >
                Edit
              </el-button>
            </router-link>
            <el-button type="text" size="small">
              Manage
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="searchParames.pageIndex"
        :limit.sync="searchParames.pageSize"
        @pagination="getSessionList"
      />
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>

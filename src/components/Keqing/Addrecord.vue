<template>
  <div>
    <el-dialog title="终端：德阳市区源生堂大药房" :visible.sync="showDialog" size="tiny">
      <el-form :label-position="labelPosition" :rules="rules" :model="form" ref="form">
        <el-form-item label="客情服务类型：">
          <el-radio-group v-model="form.serviceType">
            <el-radio label="主动客情"></el-radio>
            <el-radio label="客户来电"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务内容：" prop="serviceContent">
          <el-input type="textarea" v-model="form.serviceContent" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="回访计划：" class="item-time">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="form.returnVisitTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="回访内容:">
          <el-input type="textarea" v-model="form.returnVisitContent" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="formloading" >确定</el-button>
        <el-button @click="showDialog = false">取消</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  var moment = require('moment');// moment.js 时间格式化
  import { addRecord } from '@/api/record'
  export default {
    props: ['organizationId'],
    data() {
      return {
        labelPosition: 'left',
        showDialog: false,
        formloading: false,
        rows: 3,
        timeNow: new Date(),
        form: {
          serviceType: '主动客情',
          serviceContent: '',
          returnVisitTime: '2017-09-27',
          returnVisitContent: ''
          
        },
        rules: {
          serviceContent: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      show: function(){
        this.showDialog = true;
        // console.log(this.$refs.form)
      },
      submitForm: function(formName){
        // console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.formloading = true;
            var type = 'CUSTOMER_CALLS';
            if(this.form.serviceType == '主动客情'){
              type = 'INITIATIVE'
            };
            var visitTime = moment(this.form.returnVisitTime).format('YYYY-MM-DD')
            addRecord({
              organizationId: this.organizationId,
              returnVisitContent: this.form.returnVisitContent,
              returnVisitTime: visitTime,
              serviceContent: this.form.serviceContent,
              type: type,
            }).then( (response) => {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.showDialog = false;
              this.formloading = false;
            },
            error => {
              this.formloading = false;
            }
            )
          }else{
            return false
          }
        })
      }
    },
    created: function(){
      
    },
    mounted: function(){
      // console.log(this.$refs)
    },
    updated: function(){
      // this.$refs.form.resetFields();
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item{
    margin-bottom: 20px;
  }
  // .item-time{
  //   .el-form-item__label{
  //     float: left;
  //   };
  //   .el-form-item__content{
  //     float: left;
  //   }
  // }
</style>
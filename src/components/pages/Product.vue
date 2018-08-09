<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2"
                          style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="自动上传" prop="type">
      <el-upload
        action="http://localhost:8080/upload"
        list-type="picture-card"
        :name="'filename'"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="ruleForm.dialogVisible">
        <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>

    <el-form-item label="自定义上传" prop="type">
      <el-upload
        action="/upload"
        list-type="picture-card"
        :http-request="uploadFile"
        :name="'uploadFile'"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="ruleForm.dialogVisible">
        <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>

    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-row>
      <el-row>
      </el-row>
    </el-row>
    <el-form-item label="活动内容" prop="desc">
      <el-row v-for="(item,index) in categories" :key="index">
        <el-row type="flex" style="background: #001529 ;height: 42px;">
          <el-col :span='24'>
            <el-button type="danger" class="button" size="small" @click="deleteCategory(index)" style="float: right;"
                       v-show="categories.length > 1">删除
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <Category :param="item" :key="index" ref="cates" @childData="getCategory"/>
        </el-row>
      </el-row>
    </el-form-item>
    <el-row type="flex" justify="center">
      <el-button type="primary" size="small" @click="addCategory()">新增类目</el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
    </el-row>
  </el-form>
</template>

<script>
  import Category from './index'

  export default {
    name: 'product',
    components: {
      Category
    },
    data() {
      return {
        ruleForm: {},
        categories: [{
          name: 'name',
          code: 'code'
        }],
        rules: {
          name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          region: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          type: [{
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      uploadFile(file) {

        this.$http.uploadRequest('/upload', file)
          .then(response => {
            console.log(response);
            file.onSuccess('上传成功');
          })
          .catch(error => {
            console.log(error);
            file.onError('上传失败');
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.ruleForm.dialogImageUrl = file.url;
        this.ruleForm.dialogVisible = true;
      },
      submitForm(formName) {
        let categories = this.$refs.cates;
        categories.forEach((item) => {
          console.info(item.category)
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addCategory() {
        let length = (new Date()).getTime();
        this.categories.push({
          name: 'name' + length,
          code: 'code' + length
        })
      },
      deleteCategory(index) {

        let _this = this;
        this.categories.splice(index, 1);
        console.info(this.categories);
        this.$forceUpdate();
        this.$refs.cates.forEach((entity, index) => {
          // entity.$forceUpdate()
          // entity.category = _this.categories[index]
          entity.$set(entity.$data, "category", _this.categories[index]);
        });
        console.info(this.$refs.cates.length)
      },
      getCategory(childData) {
        console.log('get child data',childData);
        this.ruleForm.desc = JSON.stringify(childData)
      }
    }
  }
</script>

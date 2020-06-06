import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { login } from '../../utils/api/user'
import { setLocalData, HJZFW_TOKEN } from '../../utils'
import { withFormik } from 'formik';

import * as yup from 'yup'; // for everything

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  // 设置状态数据
  state = {
    username: '',
    password: ''
  }
  // 批量处理表单受控
  handerForm = (e) => {
    // console.log(e.target)
    // 做响应式
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // 处理表单登录
  // login = async (e) => {
  //   // 阻止表单的默认行为
  //   e.preventDefault()
  //   // 获取表单数据=》用户名和密码
  //   const { username, password } = this.state
  //   // console.log(username, password)
  //   // 校验

  //   // 调用接口(test2,test2)
  //   let { data, description, status } = await login({ username, password })
  //   if (status === 200) {
  //     // 登录成功
  //     // 1. 本地存储token
  //     setLocalData(HJZFW_TOKEN, data.token)
  //     // 2. 跳转
  //     // this.props.history.push('/home/profile')
  //     console.log('bugger', this.props)
  //     if (this.props.location.backUrl) {
  //       this.props.history.replace(this.props.location.backUrl);
  //     } else {
  //       this.props.history.push('/home/profile')
  //     }
  //   } else {
  //     // 登录失败
  //     // 1.提示
  //     Toast.fail(description, 2)
  //     // 2. 清空输入框
  //     this.setState({
  //       username: '',
  //       password: ''
  //     })
  //   }
  // }
  render() {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
    } = this.props;
    console.log(errors);
    // 解构
    // const { username, password } = this.state
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />


        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            <div className={styles.error}>{errors.username}</div>
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            <div className={styles.error}>{errors.password}</div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 使用withFormik高阶组件：
// 1. 处理表单双向绑定
// 2. 提交表单
const MyLogin = withFormik({
  // 双向绑定
  mapPropsToValues: () => ({ username: '', password: '' }),


  // 做校验
  // Custom sync validation
  // validate: values => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = 'Required';
  //   }

  //   return errors;
  // },
  validationSchema: yup.object().shape({
    username: yup.string().required('用户名必填！').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: yup.string().required('密码必填！').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
  }),


  // 提交
  handleSubmit: async (values, { props, setValues }) => {
    console.log(values, props)
    // 获取表单数据=》用户名和密码
    const { username, password } = values

    // 调用接口(test2,test2)
    let { data, description, status } = await login({ username, password })
    if (status === 200) {
      // 登录成功
      // 1. 本地存储token
      setLocalData(HJZFW_TOKEN, data.token)
      // 2. 跳转到个人中心
      // props.history.push('/home/profile')
      if (props.location.backUrl) {
        props.history.replace(props.location.backUrl);
      } else {
        props.history.push('/home/profile')
      }
    } else {
      // 登录失败
      // 1.提示
      Toast.fail(description, 2)
      // 2. 清空输入框
      setValues({ username: '', password: '' })
    }
  },

  displayName: 'BasicForm',
})(Login);
export default MyLogin

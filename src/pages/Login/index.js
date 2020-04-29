import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { setSession, ZFW_TOKEN } from '../../utils/index'
import { Link } from 'react-router-dom'
import { login } from '../../utils/api/user'
import styles from './index.module.css'
import { withFormik } from 'formik'
// import { BASE_URL } from '../../utils/axios'
import * as yup from 'yup'
// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  // 设置状态数据
  state = {
    username: '',
    password: ''
  }

  // 表单一个事件处理多个元素
  // handlerChange = (e) => {
  //   console.log(e)
  //   this.setState({
  //     // key:value
  //     // [e.target.name] 为一个变量
  //     [e.target.name]: e.target.value
  //   })
  // }
  // 表单登陆
  // loginForm = async (e) => {
  //   // 阻止默认事件
  //   e.preventDefault()
  //   const { username, password } = this.state
  //   // 调接口，校验用户名、密码
  //   const res = await login({ username, password })
  //   const { status, data } = res
  //   if (status === 200) {
  //     Toast.success('登陆成功！', 2)
  //     setSession(ZFW_TOKEN, data.token)
  //     this.props.history.push('/')
  //   } else {
  //     Toast.fail('登陆异常！', 2)
  //   }
  // }


  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props
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
                value={values.name}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="请输入密码"
              />
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
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

export default withFormik({

  // 1. 提供表单的状态数据；2. 当前表单的input的name属性值一一对应
  mapPropsToValues: () => ({ username: '', password: '' }),
  // 验证表单
  validationSchema: yup.object().shape({
    username: yup.string().required('账号为必填项！').matches(/^[a-z0-9_-]{5,8}$/, '账号长度为5到8位，只能出现数字、字母、下划线'),
    password: yup.string().required('密码为必填项！').matches(/^[a-z0-9_-]{5,12}$/, '密码长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // 处理表单提交
  handleSubmit: async (values, formikBag) => {
    const { username, password } = values
    const res = await login({
      username,
      password
    })
    // console.log(res)
    const { status, body, description } = res.data
    if (status === 200) {
      setSession(ZFW_TOKEN, body.token)
      Toast.success(description, 2)
      formikBag.props.history.push('/')
    } else {
      Toast.fail(description)
    }
  }
})(Login)

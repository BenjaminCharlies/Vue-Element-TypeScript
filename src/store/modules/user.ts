import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { _Client } from '../../api-client/index'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'
import { AdminLoginModel } from '@/api-client/client'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  role: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public role = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLE(role: string) {
    this.role = role
  }

  @Action
  public async Login(userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    try {
      let { token } = await _Client.authClient.authenticate(new AdminLoginModel({ email: username, password: password }))
      if (token) {
        setToken(token)
        this.SET_TOKEN(token)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLE('')
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    // _Client.authClient.authenticate(undefined, undefined, 'admin', 'admin', undefined).then(res => {
    // if (!res) {
    //   throw Error('Verification failed, please Login again.')
    // }
    this.SET_ROLE('Staff')
    this.SET_NAME('staff')
    this.SET_AVATAR('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=452663036,780623634&fm=26&gp=0.jpg')
    this.SET_INTRODUCTION('introduction')
    // roles must be a non-empty array
    // if (!res.role || res.role === undefined) {
    //   throw Error('GetUserInfo: role must be a non-null array!')
    // }
    // })
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await _Client.authClient.out()
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLE('')
  }
}

export const UserModule = getModule(User)

import { Message, MessageBox } from 'element-ui'
import Router from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { fetchInterceptor } from '../api-client/fetch-interceptor'
// Request interceptors
fetchInterceptor.interceptors.push(
  {
    request: (input: string, init: RequestInit) => {
      let headers = new Headers(init.headers)
      headers.append('App-Lang', 'en')
      init.headers = headers
      return { input, init }
    }
  },
  {
    response: (response: Response) => {
      if (response.status === 401) {
        Message({
          message: 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        MessageBox.confirm(
          'You have been logged out, try to login again.',
          'Log out',
          {
            confirmButtonText: 'Relogin',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      if (response.status === 403) {
        Message({
          message: 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (response.status === 412 || response.status === 500) {
        response.text().then(r => {
          let result = JSON.parse(r)
        })
      }
      return response
    }
  }
)

export default fetchInterceptor

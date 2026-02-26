import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types'

class ApiService {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证token
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // 添加时间戳防止缓存
        if (config.method?.toUpperCase() === 'GET') {
          config.params = {
            ...config.params,
            _t: Date.now(),
          }
        }
        
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { data } = response
        
        // 根据业务状态码处理
        if (data.code === 200) {
          return response
        } else if (data.code === 401) {
          // 未授权，清除token并跳转登录
          localStorage.removeItem('access_token')
          window.location.href = '/login'
          return Promise.reject(new Error('Unauthorized'))
        } else {
          return Promise.reject(new Error(data.message || 'Request failed'))
        }
      },
      (error) => {
        // 网络错误处理
        if (error.response) {
          // 服务器返回错误状态码
          switch (error.response.status) {
            case 401:
              localStorage.removeItem('access_token')
              window.location.href = '/login'
              break
            case 403:
              console.error('Forbidden')
              break
            case 500:
              console.error('Server Error')
              break
            default:
              console.error('Network Error:', error.message)
          }
        } else if (error.request) {
          // 请求发出但没有收到响应
          console.error('No response received:', error.request)
        } else {
          // 其他错误
          console.error('Error:', error.message)
        }
        
        return Promise.reject(error)
      }
    )
  }

  // GET请求
  public get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.get(url, { params, ...config })
  }

  // POST请求
  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.post(url, data, config)
  }

  // PUT请求
  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.put(url, data, config)
  }

  // DELETE请求
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.delete(url, config)
  }

  // PATCH请求
  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.patch(url, data, config)
  }
}

// 创建单例实例
const apiService = new ApiService()

export default apiService
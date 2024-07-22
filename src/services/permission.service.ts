import apiService from '@services/api.service'

class PermissionService {
  async GetAll(): Promise<any> {
    return apiService
      .get(`permissions`)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
  async GetPermissionByUserID(id: string): Promise<any> {
    return apiService
      .get(`/permissions/user?UserId=${id}`)
      .then((response) => {
        console.log('user - permission - service', response.data)
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
  async AddPermissionByUserID(id: string, action: string, resource: string): Promise<any> {
    return apiService
      .post(`https://localhost:7124/api/add-permission?UserId=${id}&Action=${action}&Resource=${resource}`, '')
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
  async DeletePermissionByUserID(id: string, action: string, resouce: string): Promise<any> {
    return apiService
      .delete(`https://localhost:7124/api/remove-permission?UserId=${id}&Action=${action}&Resource=${resouce}`)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}
export default new PermissionService()

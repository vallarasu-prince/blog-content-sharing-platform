import { request } from "@/services/request";

export async function getUsersList(options?: { [key: string]: any }) {
  return request('/server/api/admin/userslist', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addUser(values: any) {
  return request('/server/api/admin/user/add', {
    method: 'POST',
    data: values,
  });
}

export async function getStudentsList(options?: { [key: string]: any }) {
  return request('/server/api/admin/students/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getStudentBySid(params: any) {
  return request('/server/api/admin/student/view', {
    method: 'GET',
    params,
  });
}
export async function addStudent(values: any) {
  return request('/server/api/admin/student/add', {
    method: 'POST',
    data: values,
    params: {"sid": values?.sid}
  });
}

export async function grammercheck(values: any) {
  return request('/server/api/grammercheck', {
    method: 'POST',
    data: values,
  });
}

export async function getDashboardUtils() {
  return request('/server/api/admin/dashboard/utils', {
    method: 'GET',
    params: {}
  });
}
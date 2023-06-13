import { request } from "@/services/request";

export async function postData(values: any) {
  return request('/server/api/post/add', {
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
export async function getAllPosts() {
  return request('/server/api/posts/all', {
    method: 'GET',
    params: {}
  });
}

export async function getPostById(postId: string) {
  return request(`/server/api/post/${postId}`, {
    method: 'GET',
    params: {}
  });
}

export async function getCuser() {
  return request(`/server/api/currentUser`, {
    method: 'GET',
    params: {}
  });
}

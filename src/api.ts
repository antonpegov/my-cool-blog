import axios, { AxiosPromise } from 'axios';
import { api } from './config';
import Category from './app/features/categories/models/category';
import { Post, Comment } from './app/features/posts/models';

export const categoryApi = {
  getAll: (): AxiosPromise<Category[]> => axios.get(api + '/categories')
}

export const postsApi = {
  getPosts: (amount: number = 3, fromId?: number, ): AxiosPromise<Post[]> => 
    axios.get(`${api}/posts?_limit=${amount}${fromId?'&id_lte='+fromId:''}`)
}

export const commentsApi = {
  getComments: (amount: number, forId: number, fromId?: number): AxiosPromise<Comment[]> => 
    axios.get(`${api}/posts?_limit=${amount}&postid=${forId}${fromId?'&id_lte='+fromId:''}`)
}
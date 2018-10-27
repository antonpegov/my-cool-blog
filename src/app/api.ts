// tslint:disable:max-line-length
import axios, { AxiosPromise } from 'axios';
import { api } from '../config';
import Category from './features/categories/models/category';
import { Post, Comment } from './features/posts/models';
import * as config from '../config';

export const categoryApi = {
  getAll: (): AxiosPromise<Category[]> => axios.get(api + '/categories?_order=desc'),
};

export const postsApi = {
  getPosts: (amount: number|undefined, fromId?: number, toId?: number ): AxiosPromise<Post[]> =>
    // tslint:disable-next-line:prefer-template
    axios.get(`${api}/posts?_order=desc&${amount ? '_limit=' + amount : ''}${fromId ? '&id_gte=' + fromId + '&id_ne=' + fromId : ''}${toId ? '&id_lte=' + toId : ''}`),
};

export const commentsApi = {
  getComments: (amount: number = config.takeComments, forId: number, fromId?: number): AxiosPromise<{comments: Comment[]; postid: number}> =>
    // tslint:disable-next-line:prefer-template
    axios.get(`${api}/comments?_order=desc&_limit=${amount}&postid=${forId}${fromId ? '&id_gte=' + fromId + '&id_ne=' + fromId : ''}`),
};

import axios, { AxiosPromise } from 'axios';
import { api } from '../../../config';
import Category from './models/category';

export const getAll = (): AxiosPromise<Category[]> => axios.get(api + '/categories');

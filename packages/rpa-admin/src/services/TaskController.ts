import { request } from '@umijs/max';

export enum EPlatform {
  amazon = 'amazon',
  walmart = 'walmart',
  ebay = 'ebay',
}

export enum EStatus {
  close,
  open,
}

export enum EBrowser {
  kjvs = 'kjvs',
  puppeteer = 'puppeteer',
}

export interface ITask {
  id: number;
  name: string;
  browser: EBrowser;
  platform: EPlatform;
  account_id: unknown;
  get_method: string;
  get_url: string;
  update_method: string;
  update_url: string;
  status: EStatus | string;
  updated_at: string;
  created_at: string;
}

export interface ITaskQueryResult {
  success: boolean;
  msg?: string;
  data: {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<ITask>;
  };
}

export interface accountOptions {
  value: number;
  label: string;
}

export interface ITaskUpdateResult {
  success: boolean;
  msg?: string;
}

export interface ITaskAddResult {
  success: boolean;
  msg?: string;
}

export type TSearchParams = Partial<
  Pick<ITask, 'id' | 'name' | 'browser' | 'platform' | 'status'>
> & {
  current: number;
  pageSize: number;
};

export type TAddParams = Pick<
  ITask,
  | 'name'
  | 'browser'
  | 'platform'
  | 'account_id'
  | 'get_method'
  | 'get_url'
  | 'update_method'
  | 'update_url'
  | 'status'
>;

export type TEditParams = Pick<
  ITask,
  | 'name'
  | 'account_id'
  | 'get_method'
  | 'get_url'
  | 'update_method'
  | 'update_url'
  | 'status'
>;

export async function queryTaskList(params: TSearchParams) {
  return request<ITaskQueryResult>('/api/task/search', {
    method: 'GET',
    params,
  });
}

export async function updateTask(
  params: Pick<ITask, 'id'>,
  body: Pick<ITask, 'status'>,
) {
  const { id } = params;
  return request<ITaskUpdateResult>(`/api/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export async function addTask(data: TAddParams) {
  return request<ITaskAddResult>('/api/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}

export async function deleteTask(params: Pick<ITask, 'id'>) {
  const { id } = params;
  return request<ITaskUpdateResult>(`/api/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

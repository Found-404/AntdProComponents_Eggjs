import { request } from '@umijs/max';

export interface Accounts {
  id: number;
  account_name: string;
  account: string;
  password: string;
  remarks: string;
}

export type TAddParams = Pick<
  Accounts,
  'account' | 'password' | 'account_name' | 'remarks'
>;

export type TEditParams = TAddParams;

export interface ITaskQueryResult {
  success: boolean;
  msg?: string;
  data: {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Accounts>;
  };
}

export interface ITaskAddResult {
  success: boolean;
  msg?: string;
}

export interface ITaskUpdateResult {
  success: boolean;
  msg?: string;
}

export type TSearchParams = Partial<Pick<Accounts, 'id' | 'account'>> & {
  current?: number;
  pageSize?: number;
};

export async function queryAccountsList(params?: TSearchParams) {
  return request<ITaskQueryResult>('/api/account/search', {
    method: 'GET',
    params,
  });
}

export async function updateAccount(
  params: Pick<Accounts, 'id'>,
  body: Omit<Accounts, 'id'>,
) {
  const { id } = params;
  return request<ITaskUpdateResult>(`/api/account/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export async function addAccount(data: TAddParams) {
  return request<ITaskAddResult>('/api/account/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}

export async function deleteAccount(params: Pick<Accounts, 'id'>) {
  const { id } = params;
  return request<ITaskUpdateResult>(`/api/account/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

import { request } from '@umijs/max';

export interface Shops {
  id: number;
  name: string;
  shop_guid: string;
  platform_url: string;
  shopAccount: string;
  site: string;
  kjvsAccount: string;
}

export interface ITaskQueryResult {
  success: boolean;
  msg?: string;
  data: {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Shops>;
  };
}

export interface ITaskUpdateResult {
  success: boolean;
  msg?: string;
}

export type TSearchParams = Partial<
  Pick<Shops, 'id' | 'name' | 'shopAccount' | 'site' | 'kjvsAccount'>
> & {
  current: number;
  pageSize: number;
};

export async function queryShopsList(params: TSearchParams) {
  return request<ITaskQueryResult>('/api/shops/search', {
    method: 'GET',
    params,
  });
}

export async function deleteShop(body: { id: Shops['id'][] }) {
  return request<ITaskUpdateResult>(`/api/shops`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

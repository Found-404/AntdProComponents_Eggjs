import {
  queryShopsList,
  TSearchParams,
  Shops,
  deleteShop,
} from '@/services/ShopsController';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { message, Space, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

const ShopsTable: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const [deleteFlag, setDeleteFlag] = useState<boolean>(true);

  /**
   * 删除数据
   * @param
   */
  const confirmDelete = async (id: Shops['id'][]) => {
    if (deleteFlag) {
      const hide = message.loading(`正在删除`);
      try {
        setDeleteFlag(false);
        await deleteShop({ id });
        hide();
        if (actionRef.current) {
          actionRef.current.reload();
        }
        message.success(`删除成功`);
        setDeleteFlag(true);
        return true;
      } catch (error) {
        hide();
        setDeleteFlag(true);
        message.error(`删除失败${error}`);
        return false;
      }
    }
  };

  const columns: ProColumns<Shops>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      ellipsis: true,
      hideInForm: true,
      fixed: 'left',
    },
    {
      title: '店铺名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: '店铺guid',
      dataIndex: 'shop_guid',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '平台url',
      dataIndex: 'platform_url',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '店铺账号',
      dataIndex: 'shopAccount',
      width: 200,
      ellipsis: true,
      hideInForm: true,
    },
    {
      title: '站点',
      dataIndex: 'site',
      width: 200,
      ellipsis: true,
      hideInForm: true,
    },
    {
      title: '跨境卫士账号',
      dataIndex: 'kjvsAccount',
      width: 200,
      ellipsis: true,
      hideInForm: true,
    },
    {
      title: '操作',
      width: 200,
      ellipsis: true,
      fixed: 'right',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="确定要删除该店铺？"
            destroyTooltipOnHide
            onConfirm={() => confirmDelete([record.id])}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '店铺',
      }}
    >
      <ProTable<Shops, TSearchParams>
        rowSelection={{
          alwaysShowAlert: false,
        }}
        tableAlertOptionRender={(res) => {
          return (
            <Space size={16}>
              <Popconfirm
                title={`确定要删除该${res.selectedRowKeys.length}项数据`}
                destroyTooltipOnHide
                onConfirm={() =>
                  confirmDelete(res.selectedRowKeys as Array<number>)
                }
              >
                <a>批量删除</a>
              </Popconfirm>
            </Space>
          );
        }}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: true }}
        request={async (params) => {
          const { data, success } = await queryShopsList(params);
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ShopsTable;

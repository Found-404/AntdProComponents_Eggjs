import {
  updateTask,
  addTask,
  queryTaskList,
  ITask,
  TSearchParams,
  TAddParams,
  EStatus,
  EPlatform,
  EBrowser,
  TEditParams,
  deleteTask,
  accountOptions,
} from '@/services/TaskController';
import { queryAccountsList, Accounts } from '@/services/AccountController';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Space, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TAddParams) => {
  const hide = message.loading('正在添加');
  try {
    await addTask({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<ITask>();
  const [deleteFlag, setDeleteFlag] = useState<boolean>(true);
  const [account, setAccount] = useState<accountOptions[]>();
  const actionRef = useRef<ActionType>();

  /**
   * 更新任务状态
   * @param fields
   */
  const handleUpdate = async (id: ITask['id'], status: ITask['status']) => {
    const action = status === EStatus.close ? '关闭' : '开启';
    const hide = message.loading(`正在${action}`);
    try {
      await updateTask(
        {
          id,
        },
        {
          status,
        },
      );
      hide();

      if (actionRef.current) {
        actionRef.current.reload();
      }

      message.success(`${action}成功`);

      return true;
    } catch (error) {
      hide();
      message.error(`${action}失败请重试！`);
      return false;
    }
  };

  /**
   * 删除数据
   * @param
   */
  const confirmDelete = async (id: ITask['id']) => {
    try {
      if (deleteFlag) {
        setDeleteFlag(false);
        await deleteTask({ id });
        message.success(`删除成功`);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        setDeleteFlag(true);
      }
      return true;
    } catch (error) {
      setDeleteFlag(true);
      message.error(`删除失败${error}`);
      return false;
    }
  };

  /**
   * 编辑任务
   * @param fields
   */
  const taskEdit = async (fields: ITask) => {
    const { id, ...datas } = fields;
    try {
      await updateTask(
        {
          id,
        },
        datas,
      );
      if (actionRef.current) {
        actionRef.current.reload();
      }
      message.success(`修改成功`);
      return true;
    } catch (error) {
      message.error(`修改失败请重试！`);
      return false;
    }
  };

  /**
   * 查询账号
   * @param
   */
  const queryAccounts = async () => {
    try {
      const { data, success } = await queryAccountsList();
      if (success) {
        setAccount(
          data.list?.map((account: Accounts) => {
            return {
              value: account.id,
              label: account.account,
            };
          }),
        );
      }
    } catch (error) {
      message.error('账号查询失败');
    }
  };

  /**
   * 查询account中对应id账号
   * @param data
   * @returns label 账号
   */
  const idQueryAccount = (data: ITask) => {
    return account?.find((res: accountOptions) => {
      return res.value === Number(data.account_id);
    })?.label;
  };

  const columns: ProColumns<ITask>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      ellipsis: true,
      hideInForm: true,
      fixed: 'left',
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '任务名称为必填项',
          },
        ],
      },
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      width: 200,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        [EBrowser.kjvs]: '跨境卫士',
        [EBrowser.puppeteer]: 'Puppeteer',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '浏览器为必选项',
          },
        ],
      },
    },
    {
      title: '平台',
      dataIndex: 'platform',
      width: 200,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        [EPlatform.amazon]: '亚马逊',
        [EPlatform.walmart]: '沃尔玛',
        [EPlatform.ebay]: 'eBay',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '平台为必选项',
          },
        ],
      },
    },
    {
      title: '跨境卫士账号',
      width: 200,
      ellipsis: true,
      dataIndex: 'account_id',
      hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        options: account,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '跨境卫士账号为必填项',
          },
        ],
      },
      render: (_, all: ITask) => {
        return <span>{idQueryAccount(all)}</span>;
      },
    },
    {
      title: '获取任务请求方法',
      width: 200,
      ellipsis: true,
      dataIndex: 'get_method',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '获取任务请求方法为必选项',
          },
        ],
      },
    },
    {
      title: '获取任务请求地址',
      width: 200,
      ellipsis: true,
      dataIndex: 'get_url',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '获取任务请求地址为必填项',
          },
        ],
      },
    },
    {
      title: '更新任务请求方法',
      width: 200,
      ellipsis: true,
      dataIndex: 'update_method',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '更新任务请求方法为必选项',
          },
        ],
      },
    },
    {
      title: '更新任务请求地址',
      width: 200,
      ellipsis: true,
      dataIndex: 'update_url',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '更新任务请求地址为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      width: 200,
      ellipsis: true,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        [EStatus.close]: '关闭',
        [EStatus.open]: '开启',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '状态为必选项',
          },
        ],
      },
    },
    {
      title: '最后更新时间',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'updated_at',
      hideInForm: true,
    },
    {
      title: '创建时间',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'created_at',
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
          <a
            onClick={() =>
              handleUpdate(
                record.id,
                record.status === EStatus.open ? EStatus.close : EStatus.open,
              )
            }
          >
            {record.status === EStatus.open ? '关闭' : '开启'}
          </a>
          <a
            href="#"
            onClick={() => {
              setEditData({
                ...record,
                status: String(record.status),
                account_id: idQueryAccount(record),
              });
              setEditModalVisible(true);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定要删除该任务？"
            destroyTooltipOnHide
            onConfirm={() => confirmDelete(record.id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    queryAccounts();
  }, []);

  return (
    <PageContainer
      header={{
        title: 'RPA任务',
      }}
    >
      <ProTable<ITask, TSearchParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: true }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params) => {
          const { data, success } = await queryTaskList(params);
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
      />
      <CreateForm
        title="新建"
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<ITask, TAddParams>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <CreateForm
        title="编辑"
        onCancel={() => setEditModalVisible(false)}
        modalVisible={editModalVisible}
      >
        <ProTable<ITask, TEditParams>
          form={{
            initialValues: editData,
          }}
          onSubmit={async (value) => {
            const success = await taskEdit({ ...editData, ...value } as ITask);
            if (success) {
              setEditModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns.filter(
            (ele) =>
              ele.dataIndex !== 'browser' && ele.dataIndex !== 'platform',
          )}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default TableList;

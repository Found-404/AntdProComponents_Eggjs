import {
  TSearchParams,
  Accounts,
  TAddParams,
  TEditParams,
  queryAccountsList,
  addAccount,
  deleteAccount,
  updateAccount,
} from '@/services/AccountController';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Space, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';

/**
 * 添加账号
 * @param fields
 */
const handleAdd = async (fields: TAddParams) => {
  const hide = message.loading('正在添加');
  try {
    await addAccount(fields);
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
  const [editData, setEditData] = useState<Accounts>();
  const actionRef = useRef<ActionType>();
  const [deleteFlag, setDeleteFlag] = useState<boolean>(true);

  /**
   * 删除数据
   * @param
   */
  const confirmDelete = async (id: Accounts['id']) => {
    try {
      if (deleteFlag) {
        setDeleteFlag(false);
        await deleteAccount({ id });
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
  const taskEdit = async (fields: Accounts) => {
    const { id, ...datas } = fields;
    try {
      await updateAccount(
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

  const columns: ProColumns<Accounts>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      ellipsis: true,
      hideInForm: true,
      fixed: 'left',
    },
    {
      title: '账号',
      dataIndex: 'account',
      fixed: 'left',
      width: 200,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '账号为必填项',
          },
        ],
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      valueType: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '密码为必选项',
          },
        ],
      },
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
            href="#"
            onClick={() => {
              setEditData(record);
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

  return (
    <PageContainer
      header={{
        title: 'RPA任务',
      }}
    >
      <ProTable<Accounts, TSearchParams>
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
          const { data, success } = await queryAccountsList(params);
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
        <ProTable<Accounts, TAddParams>
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
        <ProTable<Accounts, TEditParams>
          form={{
            initialValues: editData,
          }}
          onSubmit={async (value) => {
            const success = await taskEdit({
              ...editData,
              ...value,
            } as Accounts);
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

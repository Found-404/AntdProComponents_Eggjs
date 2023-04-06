import { Modal } from 'antd';
import React, { PropsWithChildren, ReactNode } from 'react';

interface CreateFormProps {
  title: string | ReactNode;
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { title, modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      width={420}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

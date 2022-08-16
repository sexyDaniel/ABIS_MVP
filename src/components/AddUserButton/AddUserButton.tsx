import { Button, Modal, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { ChangeEventHandler, FC, useState } from 'react';

import styles from './AddUserButton.module.scss';

type AddUserButtonProps = {
    className?: string;
};

const AddUserButton: FC<AddUserButtonProps> = () => {
    const [emails, setEmails] = useState('');
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setEmails(e.target.value);

    return (
        <>
            <Button onClick={showModal}>Добавить пользователя</Button>
            <Modal
                visible={visible}
                title='Добавление пользователя'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button key='submit' type='primary' onClick={handleOk}>
                        Добавить
                    </Button>,
                ]}>
                <Typography>Введите email сотрудников через запятую</Typography>
                <Typography>Например: ivan@ya.ru,vlad@gm.com</Typography>
                <br />
                <TextArea value={emails} onChange={onChange} autoSize />
            </Modal>
        </>
    );
};

export default AddUserButton;

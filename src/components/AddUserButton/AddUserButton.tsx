import React, { FC, useState } from 'react';
import { usersApi } from '../../services/usersService';
import { Button, Input, message, Modal, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { RESET_ROUTE } from '../../routes';
import { Role } from '../../types/Role';

type AddUserButtonProps = {
    className?: string;
    companyId: number;
    role?: Role;
};

const AddUserButton: FC<AddUserButtonProps> = ({ className, companyId, role = Role.User }) => {
    const [addUsers, { isLoading }] = usersApi.useAddUsersMutation();
    const [addUser, { isLoading: userIsLoading }] = usersApi.useAddUserMutation();
    const [emails, setEmails] = useState('');
    const [visible, setVisible] = useState(false);

    /* eslint-disable no-restricted-globals */

    const handleOk = () => {
        if (role === Role.Admin) {
            addUser({ email: emails, passwordSavedLink: location.origin + RESET_ROUTE, companyId, role: Role.Admin })
                .unwrap()
                .then(
                    () => setVisible(false),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        } else {
            addUsers({ emails: emails.split(','), passwordSavedLink: location.origin + RESET_ROUTE, companyId })
                .unwrap()
                .then(
                    () => setVisible(false),
                    (err) => message.error(err.data?.message ?? 'Произошла ошибка')
                );
        }
    };
    const showModal = () => setVisible(true);
    const handleCancel = () => setVisible(false);
    const onChange = (e: any) => setEmails(e.target.value);

    if (role === Role.Admin) {
        return (
            <>
                <Button className={className} onClick={showModal}>
                    Добавить администратора
                </Button>
                <Modal
                    visible={visible}
                    title='Добавление администратора'
                    onCancel={handleCancel}
                    footer={[
                        <Button key='back' onClick={handleCancel}>
                            Отмена
                        </Button>,
                        <Button key='submit' type='primary' loading={userIsLoading} onClick={handleOk}>
                            Добавить
                        </Button>,
                    ]}>
                    <Typography>Введите email администратора</Typography>
                    <br />
                    <Input value={emails} onChange={onChange} />
                </Modal>
            </>
        );
    }

    return (
        <>
            <Button className={className} onClick={showModal}>
                Добавить пользователя
            </Button>
            <Modal
                visible={visible}
                title='Добавление пользователя'
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button key='submit' type='primary' loading={isLoading} onClick={handleOk}>
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

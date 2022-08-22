import { Typography } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../Title/Title';
import EditTestUnit from './EditTestUnit';
import EditTheoryUnit from './EditTheoryUnit';

import styles from './EditUnit.module.scss';

type EditUnitProps = {
    className?: string;
};

const EditUnit: FC<EditUnitProps> = () => {
    const { type, id } = useParams();

    return (
        <>
            <Title>Редактирование блока</Title>
            <div className={styles.wrapper}>
                {type === 'Theory' ? <EditTheoryUnit id={id} /> : <EditTestUnit id={id} />}
            </div>
        </>
    );
};

export default EditUnit;

import EditTheoryUnit from './EditTheoryUnit';
import { useParams } from 'react-router-dom';
import EditTestUnit from './EditTestUnit';
import React, { FC } from 'react';

const EditUnit: FC = () => {
    const { type, id } = useParams();

    if (type === 'Theory') return <EditTheoryUnit id={id} />;
    return <EditTestUnit id={id} />;
};

export default EditUnit;

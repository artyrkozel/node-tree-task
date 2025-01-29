import { FC, useCallback, useState } from 'react';
import { useCreateNode } from '../../api/queries';
import styles from './AddTreeNode.module.scss';
import { Input } from '../ui/Input/Input';
import { TextEl } from '../ui/Title/Text';
import { Button } from '../ui/Button/Button';
import { ButtonTheme } from '../../types/types';

interface IAddTreeNode {
    parentNodeId: number;
    onClose: () => void;
}

export const AddTreeNode: FC<IAddTreeNode> = ({ parentNodeId, onClose }) => {
    const { mutateAsync, isPending } = useCreateNode();
    const [value, setValue] = useState('');

    const handleCreteTreeNode = async () => {
        if (!value) {
            alert('Node name is empty');
            return;
        }

        mutateAsync(
            { nodeName: value, treeName: 'tree test', parentNodeId },
            {
                onSuccess: () => {
                    onClose();
                    setValue('');
                },
            },
        );
    };

    const handleChange = useCallback((value: string) => setValue(value), []);

    return (
        <div className={styles.AddTreeNode}>
            <TextEl title="Add node" className={styles.title} />
            <Input className={styles.field} placeholder="node name" onChange={handleChange} value={value} />
            <div className={styles.btnWrapper}>
                <Button onClick={handleCreteTreeNode} disabled={isPending}>
                    add
                </Button>
                <Button variant={ButtonTheme.SECONDARY} onClick={() => onClose()}>
                    cancel
                </Button>
            </div>
        </div>
    );
};

import { FC, useCallback, useEffect, useState } from 'react';
import { useRenameNode } from '../../api/queries';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import { TextEl } from '../ui/Title/Text';
import styles from './EditTreeNode.module.scss';
import { ButtonTheme } from '../../types/types';

interface IAddTreeNode {
    nodeId: number;
    nodeName: string;
    onClose: () => void;
}

export const EditTreeNode: FC<IAddTreeNode> = ({ nodeId, nodeName, onClose }) => {
    const { mutateAsync: renameNode } = useRenameNode();
    const [value, setValue] = useState('');

    const handleCreteTreeNode = async () => {
        if (!value) {
            alert('Node name is empty');
            return;
        }

        renameNode({ treeName: 'tree test', newNodeName: value, nodeId }, { onSuccess: () => onClose() });
    };

    const handleChange = useCallback((value: string) => setValue(value), []);

    useEffect(() => {
        setValue(nodeName);
    }, [nodeName]);

    return (
        <div className={styles.EditTreeWrapper}>
            <TextEl className={styles.title} title="Rename" />
            <Input className={styles.field} placeholder="node name" onChange={handleChange} value={value} />
            <div className={styles.btnWrapper}>
                <Button onClick={handleCreteTreeNode}>Rename</Button>
                <Button variant={ButtonTheme.SECONDARY} onClick={() => onClose()}>
                    cancel
                </Button>
            </div>
        </div>
    );
};

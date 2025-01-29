import { FC } from 'react';
import styles from './DeleteTreeNode.module.scss';
import { TextEl } from '../ui/Title/Text';
import { Button } from '../ui/Button/Button';
import { useDeleteNode } from '../../api/queries';
import { ButtonTheme } from '../../types/types';

interface IAddTreeNode {
    nodeId: number;
    nodeName: string;
    onClose: () => void;
}

export const DeleteTreeNode: FC<IAddTreeNode> = ({ nodeId, nodeName, onClose }) => {
    const { mutateAsync, isPending } = useDeleteNode();

    const handleCreteTreeNode = async () => {
        await mutateAsync({ treeName: 'tree test', nodeId });
    };

    return (
        <div className={styles.DeleteTreeNode}>
            <TextEl className={styles.title} title="Delete" />
            <>
                <TextEl className={styles.message} text={`Do you want to delete ${nodeName}`} />
                <div className={styles.btnWrapper}>
                    <Button onClick={handleCreteTreeNode} disabled={isPending}>
                        Delete
                    </Button>
                    <Button variant={ButtonTheme.SECONDARY} onClick={() => onClose()}>
                        cancel
                    </Button>
                </div>
            </>
        </div>
    );
};

import { FC, useState } from 'react';
import ArrowIcon from '../../../assets/icons/arrow.svg';
import AddIcon from '../../../assets/icons/add.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import styles from './TreeNode.module.scss';
import { ReactTestTreeSiteModelMNode } from '../../../api/generated';
import { EActionType } from '../../../types/types';
import { classNames, Mods } from '../../../libs/classNames';
import { IconButton } from '../../ui/IconButton/IconButton';
import { Modal } from '../../ui/Modal/Modal';
import { EditTreeNode } from '../../EditTreeNode/EditTreeNode';
import { AddTreeNode } from '../../AddTreeNode/AddTreeNode';
import { DeleteTreeNode } from '../../DeleteTreeNode/DeleteTreeNode';

interface ITreeNode {
    node: ReactTestTreeSiteModelMNode;
    onSelect: (node: ReactTestTreeSiteModelMNode) => void;
    selectedNode: ReactTestTreeSiteModelMNode | null;
}

export const TreeNode: FC<ITreeNode> = ({ node, onSelect, selectedNode }) => {
    const { children, name } = node;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState<EActionType>(EActionType.EDIT);
    const [showChildren, setShowChildren] = useState(false);
    const isNodeSelected = selectedNode?.id === node.id;

    const handleClick = () => {
        setShowChildren(!showChildren);
        onSelect(node);
    };

    const handleOpenModal = (e: React.MouseEvent, actionsType: EActionType) => {
        e.stopPropagation();
        setIsModalOpen(true);
        setActionType(actionsType);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const mods: Mods = {
        [styles.transparent]: !isNodeSelected,
        [styles.selected]: isNodeSelected,
    };

    const arrowMods = {
        [styles.arrowTop]: showChildren,
        [styles.aarowBottom]: !showChildren,
    };

    return (
        <>
            <div className={classNames(styles.TreeNode, mods)} onClick={handleClick}>
                <div className={styles.nodeTitle}>
                    {children && children.length ? (
                        <img className={classNames(styles.arrowIcon, arrowMods)} src={ArrowIcon} alt="arrow icon" />
                    ) : null}

                    <span className={styles.nodeName}>{name}</span>
                    {isNodeSelected && (
                        <div className={styles.actionButtonWrapper}>
                            <IconButton icon={AddIcon} onClick={(e) => handleOpenModal(e, EActionType.CREATE)} />
                            <IconButton icon={EditIcon} onClick={(e) => handleOpenModal(e, EActionType.EDIT)} />
                            <IconButton icon={DeleteIcon} onClick={(e) => handleOpenModal(e, EActionType.DELETE)} />
                        </div>
                    )}
                </div>
            </div>
            {children && children.length > 0 && (
                <div className={styles.nodeChildrenWrapper}>
                    {showChildren &&
                        children.map((child) => (
                            <TreeNode key={child.id} node={child} onSelect={onSelect} selectedNode={selectedNode} />
                        ))}
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {actionType === EActionType.EDIT && (
                    <EditTreeNode
                        nodeId={Number(selectedNode?.id)}
                        nodeName={selectedNode?.name ?? ''}
                        onClose={handleCloseModal}
                    />
                )}
                {actionType === EActionType.CREATE && (
                    <AddTreeNode parentNodeId={Number(selectedNode?.id)} onClose={handleCloseModal} />
                )}
                {actionType === EActionType.DELETE && (
                    <DeleteTreeNode
                        nodeId={Number(selectedNode?.id)}
                        nodeName={selectedNode?.name ?? ''}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </>
    );
};

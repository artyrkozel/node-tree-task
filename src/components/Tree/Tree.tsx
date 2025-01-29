import { FC, useState } from 'react';
import { ReactTestTreeSiteModelMNode } from '../../api/generated';
import styles from './Tree.module.scss';
import { TreeNode } from './TreeNode/TreeNode';

interface ITree {
    treeData: ReactTestTreeSiteModelMNode | undefined;
}

export const Tree: FC<ITree> = ({ treeData }) => {
    const [selectedNode, setSelectedNode] = useState<ReactTestTreeSiteModelMNode | null>(null);

    const handleSelect = (node: ReactTestTreeSiteModelMNode) => {
        setSelectedNode(node);
    };

    if (!treeData) {
        return <div>no data</div>;
    }

    return (
        <div className={styles.Tree}>
            <TreeNode node={treeData} onSelect={handleSelect} selectedNode={selectedNode} />
        </div>
    );
};

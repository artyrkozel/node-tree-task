import './styles/App.css';
import { Tree } from './components/Tree/Tree';
import { useGetTree } from './api/queries';

function App() {
    const { data: treeData, isLoading } = useGetTree();

    if (isLoading) {
        return <div>...loading</div>;
    }

    return (
        <div className='App'>
            <Tree treeData={treeData} />
        </div>
    );
}

export default App;

import SingleItem from './SingleItem';
import { useFetchTasks } from '../ReachQueryCustomHook';

const Items = ({ setIsEditing, setItem, tasks, users }) => {

    if (tasks.length === 0) {
        return <h2 className='items' style={{ textAlign: 'center', marginTop: '3rem' }}>Add Some Items</h2>
    }

    return (
        <div className='items'>
            {tasks.map((item) => {
                return <SingleItem key={item._id} item={item}
                    setIsEditing={setIsEditing} setItem={setItem} users={users} />;
            })}
        </div>
    );
};
export default Items;

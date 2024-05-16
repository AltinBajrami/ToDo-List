import SingleItem from './SingleItem';
import { useFetchTasks } from './ReachQueryCustomHook';

const Items = ({ setIsEditing, setItem }) => {
    const { isLoading, data, error, isError } = useFetchTasks();


    if (isLoading) {
        return <main className='loading' style={{ marginTop: '2rem' }}></main>
    }

    if (isError) {
        return <main style={{ marginTop: '2rem' }} >
            <p>{error.response.data}</p>
        </main>
    }

    if (data.tasks.length === 0) {
        return <h2 className='items' style={{ textAlign: 'center', marginTop: '3rem' }}>Add Some Items</h2>
    }


    return (
        <div className='items'>
            {data.tasks.map((item) => {
                return <SingleItem key={item._id} item={item} setIsEditing={setIsEditing} setItem={setItem} />;
            })}
        </div>
    );
};
export default Items;

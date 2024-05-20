import { useDeleteTask, useEditTask } from "../ReachQueryCustomHook";

const SingleItem = ({ item, setItem, setIsEditing }) => {
    const { editTask } = useEditTask();

    const { deleteTask, isPending } = useDeleteTask();

    return (
        <div className='single-item'>
            <input
                type='checkbox'
                checked={item.completed}
                onChange={(e) => editTask({ taskId: item._id, name: item.name, completed: e.target.checked })}
            />
            <p
                style={{
                    textTransform: 'capitalize',
                    textDecoration: item.completed && 'line-through',
                }}
            >
                {item.name}
            </p>
            <button
                className='btn remove-btn'
                type='button'
                disabled={isPending}
                onClick={() => deleteTask({ taskId: item._id })}
            >
                delete
            </button>
            <button
                className='btn edit-btn'
                type='button'
                onClick={() => {
                    setIsEditing(true)
                    setItem({ name: item.name, id: item._id })
                }}
            >
                edit
            </button>
        </div>
    );
};
export default SingleItem;

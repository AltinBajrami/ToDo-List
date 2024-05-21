import { useState } from "react";
import { useDeleteTask, useEditTask } from "../ReachQueryCustomHook";
import UserList from "./UserList";

const SingleItem = ({ item, setItem, setIsEditing, users }) => {
    const { editTask } = useEditTask();

    const { deleteTask, isPending } = useDeleteTask();
    const [showUserList, setShowUserList] = useState(false);

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
                {item.name} <span style={{ fontWeight: 'bold' }}>{item?.user && `'${item.user.name}'`}</span>
            </p>


            <button
                className='btn edit-btn'
                type='button'
                onClick={() => setShowUserList(!showUserList)}
            >
                {item?.user ? 'edit' : 'add'} user
            </button>
            {showUserList && <UserList users={users} taskId={item._id}
                setShowUserList={setShowUserList} activeUserId={item?.user?._id} />}

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
            <button
                className='btn remove-btn'
                type='button'
                disabled={isPending}
                onClick={() => deleteTask({ taskId: item._id })}
            >
                delete
            </button>
        </div>
    );
};
export default SingleItem;

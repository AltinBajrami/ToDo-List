import { useState } from 'react';
import { useCreateTask, useEditTask } from './ReachQueryCustomHook';
import { toast } from 'react-toastify';

const Form = ({ isEditing, item, setItem, setIsEditing }) => {

    const { isLoading, createTask, error, isError } = useCreateTask();
    const { editTask } = useEditTask();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            editTask({ taskId: item.id, name: item.name }, {
                onSuccess: () => {
                    setItem({ name: '', id: '' });
                }
            })
            setIsEditing(false)
        } else
            createTask(item.name, {
                onSuccess: () => {
                    setItem({ name: '', id: '' });
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Tasks</h4>
            <div className='form-control'>
                <input
                    type='text'
                    className='form-input'
                    value={item.name}
                    onChange={(event) => setItem({ ...item, name: event.target.value })}
                />
                <button type='submit' className='btn' disabled={isLoading}>
                    {isEditing ? 'edit' : 'add'} task
                </button>
            </div>
        </form>
    );
};
export default Form;

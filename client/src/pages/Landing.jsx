import React from 'react'
import Tasks from '../components/Tasks'
import { toast } from 'react-toastify';
import { useFetchTasks, useFetchUsers } from '../ReachQueryCustomHook';
import { useQuery } from '@tanstack/react-query';

export const loader = (queryClient) => async () => {
    try {
        await queryClient.ensureQueryData(useFetchTasks());
        await queryClient.ensureQueryData(useFetchUsers());
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
    return ''
}

const Landing = () => {
    const { data } = useQuery(useFetchTasks())
    const { data: { users } } = useQuery(useFetchUsers())
    const tasks = data?.tasks || [];
    console.log(tasks);
    return (
        <Tasks tasks={tasks} users={users} />
    )
}

export default Landing
import React from 'react'
import Tasks from '../components/Tasks'
import { toast } from 'react-toastify';
import { useFetchTasks, useFetchUsers } from '../ReachQueryCustomHook';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';

export const loader = (queryClient) => async () => {
    try {
        await queryClient.ensureQueryData(useFetchTasks());
        await queryClient.ensureQueryData(useFetchUsers());
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect('/login');
    }
    return ''
}

const Landing = () => {
    const { data } = useQuery(useFetchTasks())
    const { data: data1 } = useQuery(useFetchUsers())
    const tasks = data?.tasks || [];
    const users = data1?.users
    return (
        <Tasks tasks={tasks} users={users} />
    )
}

export default Landing
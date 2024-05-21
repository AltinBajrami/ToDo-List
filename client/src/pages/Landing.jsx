import React from 'react'
import Tasks from '../components/Tasks'
import customFetch from '../utils'
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useFetchTasks } from '../ReachQueryCustomHook';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const loader = (queryClient) => async () => {
    try {
        await queryClient.ensureQueryData(useFetchTasks());
        return ''
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return [];
    }
}

const Landing = () => {
    const { data: { tasks } } = useQuery(useFetchTasks())
    return (
        <Tasks tasks={tasks} />
    )
}

export default Landing
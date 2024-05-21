import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  return {
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/tasks')
      return data;
    }
  }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading, error, isError } = useMutation({
    mutationFn: (name) => customFetch.post('/tasks', { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading, error, isError };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, name, completed }) => customFetch.patch(`/tasks/${taskId}`, { name, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task updated')
    },
    onError: (error) => {
      toast.error(error.response.data.msg)
    }
  })
  return { editTask }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: ({ taskId }) => customFetch.delete(`/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted')
    },
    onError: (error) => {
      toast.error(error.response.data.msg)
    }
  })
  return { deleteTask, isPending }
}


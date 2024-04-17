import { apiSlice } from "../../app/api/apiSlice";
import { Todo } from "../../interface/todo";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GETS
    getUserTodos: builder.query<Todo[], any>({
      query: () => ({
        url: `todo`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      providesTags: ["Todo"],
    }),
    getTodoById: builder.query({
      query: (id) => "todo/" + id,
      keepUnusedDataFor: 60,
      providesTags: ["Todo"],
    }),
    // POST
    createTodo: builder.mutation<any, any>({
      query: (payload: any) => ({
        url: "todo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Todo"],
    }),
    // PUT
    updateTodo: builder.mutation<any, Todo>({
      query: (payload: Todo) => ({
        url: "todo/" + payload.id,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Todo"],
    }),
    // PUT
    deleteTodo: builder.mutation<any, number>({
      query: (id:number) => ({
        url: "todo/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  // GETS
  useGetUserTodosQuery,
  useGetTodoByIdQuery,
  // POSTS
  useCreateTodoMutation,
  // PUTS
  useUpdateTodoMutation,
  // DELETE
  useDeleteTodoMutation,
} = todoApiSlice;

import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) =>
        `/projects?team.members_like=${email}&_sort=date&_order=desc`,
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: project } = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getProjects",
            project.creator.email,
            (draft) => {
              draft.unshift(project);
            }
          )
        );
      },
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
      //   const { data: updatedProject } = await queryFulfilled;
      //   const { email } = getState().auth?.user;
      //   dispatch(
      //     apiSlice.util.updateQueryData("getProjects", email, (draft) => {
      //       return draft.map((project) =>
      //         project.id === updatedProject.id
      //           ? { ...project, stage: updatedProject.stage }
      //           : project
      //       );
      //     })
      //   );
      // },
    }),
    deleteProject: builder.mutation({
      query: ({ id, email }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getProjects", arg.email, (draft) => {
            return draft.filter((project) => project.id !== arg.id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

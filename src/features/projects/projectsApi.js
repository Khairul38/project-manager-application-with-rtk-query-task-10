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
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation } = projectsApi;

import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members.email=${email}`,
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
    }),
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTeam: builder.mutation({
      query: ({ id, email }) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;

import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}&_sort=date&_order=desc`,
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: team } = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData(
            "getTeams",
            team.creator.email,
            (draft) => {
              draft.unshift(team);
            }
          )
        );
      },
    }),
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const { data: updatedTeam } = await queryFulfilled;
        const { email } = getState().auth?.user;
        dispatch(
          apiSlice.util.updateQueryData("getTeams", email, (draft) => {
            return draft.map((team) =>
              team.id === updatedTeam.id
                ? { ...team, members: updatedTeam.members }
                : team
            );
          })
        );
      },
    }),
    deleteTeam: builder.mutation({
      query: ({ id, email }) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData("getTeams", arg.email, (draft) => {
            return draft.filter((team) => team.id !== arg.id);
          })
        );
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;

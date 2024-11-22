import { CastMember, CastMemberParams, Result, Results } from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id:"",
  name:"",
  type: 0,
  deleted_at: null,
  created_at:"",
  updated_at:"",
};

function parseQueryParams(params: CastMemberParams){
  const query = new URLSearchParams();

  if(params.page){
    query.append("page", params.page.toString());
  }

  if(params.perPage){
    query.append("per_page", params.perPage.toString());
  }

  if(params.search){
    query.append("search", params.search);
  }

  if(params.type){
    query.append("type", params.type.toString());
  }

  return query.toString();
  
}

function getCastMembers(params: CastMemberParams){
  const { page = 1, perPage = 10, search, type } = params;

  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type
  })}`;
}

function getCastMember({id}: {id: string}){
  return {
    url: `${endpointUrl}/${id}`,
    method: "GET"
  }
}

function deleteCastMember({id}: {id: string}){
  return {
    url: `${endpointUrl}/${id}`,
    //url: `${endpointUrl}2/${id}`,
    method: "DELETE"
  }
}

function createCastMember(castMember: CastMember){
  return {
    url: endpointUrl,
    method: "POST",
    data: castMember
  };
}

function updateCastMember(castMember: CastMember){
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    data: castMember,
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),

    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),

    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),

    createCastMembers: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),

    updateCastMembers: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMemberQuery, 
  useGetCastMembersQuery,
  useDeleteCastMemberMutation,
  useCreateCastMembersMutation,
  useUpdateCastMembersMutation
} = castMembersApiSlice;
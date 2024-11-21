import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CategoryParams, Result, Results } from "../../types/Category";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams){
  const query = new URLSearchParams();

  if(params.page){
    query.append("page", params.page.toString());
  }

  if(params.perPage){
    query.append("per_page", params.perPage.toString());
  }

  if(params.page){
    query.append("page", params.page.toString());
  }

  if(params.search){
    query.append("search", params.search);
  }

  if(params.isActive){
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = ""}){
  const params = { page, perPage, search, isActive: true};


  console.log(`${endpointUrl}?${parseQueryParams(params)}`);

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  }
}

function createCategoryMutation(category: Category){
  return { url: endpointUrl, method: "POST", body: category};
  //return { url: "/categories2", method: "POST", body: category };
}

function updateCategoryMutation(category: Category){
  return { url: `${endpointUrl}/${category.id}`, method: "PUT", body: category};
  //return { url: `/categories2/${category.id}`, method: "PUT", body: category};
}

function getCategoryQuery({id}:{id: string}){
  return `${endpointUrl}/${id}`;
  //return `/categories2/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),

    getCategory: query<Results, { id: string }>({
      query: getCategoryQuery,
      providesTags: ["Categories"],
    }),

    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),

    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: "123",
  name: "Oliver",
  description: "desc",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:50:09+0000",
  updated_at: "2022-08-15T10:50:09+0000"
}

export const initialState = [
    category,
    { ...category, id: "234", name: "Pet" },
    { ...category, id: "345", name: "Quat" },
    { ...category, id: "456", name: "Rout" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      //find index on state of category to update
      const index = state.findIndex((category)=> category.id === action.payload.id);
      
      //update category on state
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      //find index on state of category to update
      const index = state.findIndex((category) => category.id === action.payload.id);

      //update category on state
      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((c) => c.id === id);
  return category || {
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: ""
  };
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const {
  useGetCategoryQuery, 
  useGetCategoriesQuery, 
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation
} =  categoriesApiSlice;
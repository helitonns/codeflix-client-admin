import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}


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
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
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
import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export default function EditCategory() {
  const id = useParams().id || "";
  const {data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, status ] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  
  //----------------------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateCategory(categoryState);
  }

  useEffect(()=> {
    if(category){
      setCategoryState(category.data[0]);
    }
  }, [category]);

  useEffect(()=> {
    if(status.isSuccess){
      enqueueSnackbar("Category updated successfully!", { variant: "success" });
    }
    
    if(status.error){
      enqueueSnackbar("Category not updated!", { variant: "success" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);
  //----------------------------------------------------------------------------
  
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <Box p={2}>
          <CategoryForm
            isLoading={isFetching}
            category={categoryState}
            isDisabled={status.isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          />
        </Box>
      </Paper>
    </Box>
  );
}

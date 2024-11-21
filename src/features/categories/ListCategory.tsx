import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from './components/CategoryTable';
import { GridFilterModel } from "@mui/x-data-grid";

export default function ListCategory() {

  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  //____________________________________________________________________________
  function handleOnPageChange(page: number){
    setOptions({ ...options, page: page + 1 });
  }
  
  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }
  
  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });    
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted", { variant: "success"});
    }
    
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Category not deleted", { variant: "error"});
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);
  
  if(error){
    return <Typography>Error fetching categories</Typography>
  }
  //____________________________________________________________________________

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
}

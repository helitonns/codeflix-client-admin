import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from './components/CategoryTable';
import { GridFilterModel } from "@mui/x-data-grid";

export default function ListCategory() {
  const [ perPage ] = useState(10);
  const [ rowsPerPage ] = useState([10, 25, 50, 100]);
  const [search, setSearch] = useState("");
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  //____________________________________________________________________________
  function handleOnPageChange(page: number){
    console.log(page);
  }
  
  function handleOnPageSizeChange(page: number){
    console.log(page);
  }
  
  function handleFilterChange(filterModel: GridFilterModel) {
    console.log("teste");
  }

  async function handleDeleteCategory(id: string) {
    console.log(id);
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
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
}

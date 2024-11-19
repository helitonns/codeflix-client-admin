import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  data: Results | undefined;
  isFetching: boolean;
  perPage: number;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
}

export function CategoryTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props){

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${row.id}`}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(row.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function mapDataToGridRows(data: Results){
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      isActive: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  const rows = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;








  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={perPage}
        loading={isFetching}
        rowCount={rowCount}
        filterMode={"server"}
        paginationMode={"server"}
        componentsProps={componentProps}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        checkboxSelection={false}
        components={{ Toolbar: GridToolbar }}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        rowsPerPageOptions={rowsPerPage}
      />
    </Box>
  );
}
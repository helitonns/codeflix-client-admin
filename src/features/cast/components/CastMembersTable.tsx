import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/CastMembers";
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

export function CastMembersTable({
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
    // { field: "id", headerName: "ID", flex: 1},
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    { field: "type", headerName: "Type", flex: 1, renderCell: renderTypeCell},
    { field: "id", headerName: "Actions", flex: 1,  renderCell: renderActionsCell,},
  ];

  function renderNameCell(row: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/cast_members/edit/${row.id}`}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    );
  }

  function renderTypeCell(row: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {row.value === 1 ? "Diretor" : "Ator"}
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
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
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
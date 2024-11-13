import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { 
    DataGrid, 
    GridColDef, 
    GridRenderCellParams, 
    GridRowsProp,
    GridToolbar
} from "@mui/x-data-grid";

export default function ListCategory(){
    const categories = useAppSelector(selectCategories);

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500}
        }
    }

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
        actions: category.id,
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell},
        { field: "isActive", headerName: "Active", flex: 1, type: "boolean", renderCell: renderIsActiveCell },
        { field: "createdAt", headerName: "Created At", flex: 1 },
        { field: "actions", headerName: "Actions", flex: 1, renderCell: renderActionsCell},
    ];

    function renderIsActiveCell(row: GridRenderCellParams) {
        return (
            <Typography color={row.value ? "primary" : "secondary"}>
                {row.value ? "Active" : "Inactive"}
            </Typography>
        );
    };

    function renderActionsCell(row: GridRenderCellParams) {
        return (
            <IconButton color="secondary" onClick={()=> console.log("clicked")} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        );
    };

    function renderNameCell(row: GridRenderCellParams){
        return(
            <Link style={{ textDecoration: "none"}} to={`/categories/edit/${row.id}`}>
                <Typography color="primary">{row.value}</Typography>
            </Link>
        );
    };

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button 
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{marginBottom: "1rem"}}
                >
                    New Category
                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 600}}>
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    rowsPerPageOptions={[2, 20, 50, 100]}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    disableSelectionOnClick={true}
                    components={{Toolbar: GridToolbar}}
                    componentsProps={componentProps}
                />
            </Box>
        </Box>
);
}
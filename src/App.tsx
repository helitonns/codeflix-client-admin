import { Box, ThemeProvider} from "@mui/material";
import { Header } from "./app/components/Header";
import { Layout } from "./app/components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route} from "react-router-dom";
import ListCategory from "./features/categories/ListCategory";
import CreateCategory from "./features/categories/CreateCategory";
import EditCategory from "./features/categories/EditCategory";
import { SnackbarProvider } from "notistack";
import {ListCastMembers} from "./features/cast/ListCastMembers";
import {CreateCastMembers} from "./features/cast/CreateCastMembers";
import {EditCastMembers} from "./features/cast/EditCastMembers";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
            color: "white",
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              {/* Category */}
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />

              {/* CastMenber */}
              <Route path="/cast_members" element={<ListCastMembers />} />
              <Route path="/cast_members/create" element={<CreateCastMembers />} />
              <Route path="/cast_members/edit/:id" element={<EditCastMembers />} />

              <Route path="*" element={"Pagina nao enconatrada"} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

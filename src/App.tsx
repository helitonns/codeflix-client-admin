import { Box, ThemeProvider} from "@mui/material";
import { Header } from "./app/components/Header";
import { Layout } from "./app/components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route} from "react-router-dom";
import ListCategory from "./features/categories/ListCategory";
import CreateCategory from "./features/categories/CreateCategory";
import EditCategory from "./features/categories/EditCategory";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme)=> theme.palette.grey[900],
          color: "white",
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<ListCategory />}/>
            <Route path="/categories" element={<ListCategory />}/>
            <Route path="/categories/create" element={<CreateCategory />}/>
            <Route path="/categories/edit/:id" element={<EditCategory />}/>
            
            <Route path="*" element={"Pagina nao enconatrada"}/>
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;

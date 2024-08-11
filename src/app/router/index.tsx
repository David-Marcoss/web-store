import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Home } from "../pages";
import { AuthLogin } from "../pages/auth/AuthLogin";
import { AuthRegister } from "../pages/auth/AuthRegister";
import { useContext, useEffect } from "react";
import { UserLoggedContext } from "../shared/contexts";
import { ProductCreate } from "../pages/products/ProductCreate";
import { ProductUpdate } from "../pages/products/ProductUpdate";
import { ProductDelete } from "../pages/products/ProductDelete"; // Importe o componente de deletar

export const MainRoutes = () => {
    const userLogged = useContext(UserLoggedContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogged.logout();
        navigate("/login");
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route
                path="/logout"
                element={<LogoutComponent onLogout={handleLogout} />}
            />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:productId" element={<ProductUpdateWrapper />} />
            <Route path="/products/delete/:productId" element={<ProductDeleteWrapper />} /> {/* Rota de deleção */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const LogoutComponent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return null;
};

const ProductUpdateWrapper: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    return <ProductUpdate productId={Number(productId)} />;
};

const ProductDeleteWrapper: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    return <ProductDelete productId={Number(productId)} />;
};

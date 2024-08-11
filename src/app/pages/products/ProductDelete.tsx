import { useCallback, useContext, useEffect } from "react";
import { ProductsService } from "../../shared/services/api/products/ProductService";
import { UserLoggedContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";
import "./products.css";

interface IProductDeleteProps {
    productId: number;
}

export const ProductDelete = ({ productId }: IProductDeleteProps) => {
    const userLogged = useContext(UserLoggedContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLogged.isAuthenticated) {
            navigate("/login")
        }
    }, [navigate, userLogged.isAuthenticated, userLogged.token]); // Array de dependências


    const deleteProduct = useCallback(() => {
        if (userLogged.token && productId) {
            const productService = new ProductsService(userLogged.token);

            productService.deleteById(productId).then((res) => {
                if (!res) {
                    navigate("/");
                } else {
                    alert("Erro ao deletar o produto.");
                }
            });
        }
    }, [userLogged.token, productId, navigate]);

    return (
        <div className="products">
            <div className="product-delete-card">
                <h2>Tem certeza que deseja excluir o produto?</h2>
                <div className="product-delete-buttons">
                    <button onClick={() => navigate("/")} className="cancel-button">
                        Cancelar
                    </button>
                    <button onClick={deleteProduct} className="delete-button">
                        Deletar Produto
                    </button>
                </div>
            </div>
        </div>
    );
};

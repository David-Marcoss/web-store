import { Link } from "react-router-dom";
import { IProducts } from "../../../shared/services/api/products/ProductService";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importação dos ícones

interface CardProductProps {
    product: IProducts;
}

export const CardProduct = ({ product }: CardProductProps) => {

    return (
        <div className="card-product">
            <div className="card-header">
                <h3>{product.name}</h3>
            </div>

            <div className="card-body">
                {product.description ? (
                    <p>{product.description}</p>
                ) : (
                    <p className="no-description">Descrição não disponível</p>
                )}
                <span>Preço: {product.price}</span>
                <span>Quantidade: {product.stock}</span>
            </div>

            <div className="card-footer">
                <Link to={`/products/edit/${product.id}`} className="edit-link">
                    <FaEdit className="icon" /> Editar
                </Link>
                <Link to={`/products/delete/${product.id}`} className="delete-link">
                    <FaTrashAlt className="icon" /> Excluir
                </Link>
            </div>
        </div>
    );
};

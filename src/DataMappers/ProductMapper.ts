import Product from "../Entities/ProductEntity";
import AbstactMapper from "./AbstractMapper";

class ProductMapper extends AbstactMapper {
    public mapObjectToEntity(obj : {id : Number, title : String}) : Product {
        let product = new Product

        product.setId(obj.id)
        product.setTitle(obj.title)

        return product
    }

}

export default ProductMapper
import AbstractRepository from '../Repositories/AbstractRepository'
import Product from '../Entities/ProductEntity'
import { PathLike, readFileSync } from 'fs'

class ProductsRepository extends AbstractRepository {
    protected table : PathLike = __dirname + '/../../products.json'

    
    public mapObjetToEntity(items) {
        this.data = [].map(item => {
            let product = new Product
            product.setId(item.id)
            product.setTitle(item.title)
            // product.setPrice(item.price)
            
            return product
        })
    }
}

export default ProductsRepository
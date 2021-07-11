import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "../../node_modules/typeorm/index";

@Entity({name: "products"}) // Indico el nombre de la tabla n la base de datos
export class Product {
    @PrimaryGeneratedColumn()
    id : Number

    @Column({
        length: 200
    })
    title: String

    @Column()
    price: Number

    @Column()
    stock: Number

    @Column()
    description: String

    @Column({name: "is_visible"}) // Indisco el nomb. de la columna en la DB
    isvisible: Boolean
    
    @Column({name: "brand_id"})
    brandId: Number

    @Column({name: "created_at"})
    createdAt: Date

    @Column({name: "updated_at"})
    updatedAt: Date

    @Column({name: "deleted_at"})
    deletedAt: Date
}
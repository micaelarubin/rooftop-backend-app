// Product, Customer, BuyOrder, User, Doctor, DOg

abstract class Entity {
    protected id : Number

    public setId(id : Number) {
        this.id = id
    }

    public getId () : Number {
        return this.id
    }
}

export default Entity
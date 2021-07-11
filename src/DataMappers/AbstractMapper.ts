import Entity from "../Entities/AbstractEntity";

abstract class AbstactMapper {
    abstract mapObjectToEntity(obj : object) : Entity;
}

export default AbstactMapper
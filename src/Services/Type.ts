import ValueType from "../Enums/ValueType";

class Type
{
    private item: object|string|number|symbol|boolean|null;

    constructor(item: object|string|number|symbol|boolean|null)
    {
        this.item = item;
    }

    public isObject(): boolean
    {
        return ValueType.Object === typeof this.item;
    }

    public isNull(): boolean
    {
        return null === this.item;
    }

    public isNotNull(): boolean
    {
        return null !== this.item;
    }

    public isBoolean(): boolean
    {
        return ValueType.Boolean === typeof this.item;
    }
}

export default Type

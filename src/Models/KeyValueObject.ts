import ObjectKeyType from "../Types/ObjectKeyType";
import ObjectValueType from "../Types/ObjectValueType";

class KeyValueObject<KeyType extends ObjectKeyType, ValueType extends ObjectValueType>
{
    private object: {[key in KeyType]: ValueType};

    public constructor(object: {[key in KeyType]: ValueType})
    {
        this.object = object;
    }

    public value(key: KeyType, itsDefault: ValueType = null as ValueType): ValueType
    {
        try {
            this.tryKey(key);
            return this.object[key];
        } catch (err) {
            return itsDefault;
        }
    }

    public keys(): KeyType[]
    {
        return Object.keys(this.object) as KeyType[];
    }

    private tryKey(key: KeyType): void
    {
        if (! this.object.hasOwnProperty(key)) {
            throw new Error(`Object doesnt contain key ${key as string}`);
        }
    }
}

export default KeyValueObject

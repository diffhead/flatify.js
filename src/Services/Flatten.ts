import FlatKeyValueObject from "../Models/FlatKeyValueObject";
import RawKeyValueObject from "../Models/RawKeyValueObject";
import FlatObjectKeyType from "../Types/FlatObjectKeyType";
import Object from "../Types/Object";
import Extractor from "./Extractor";
import KeyBuilder from "./KeyBuilder";
import Type from "./Type";

class Flatten
{
    private object: RawKeyValueObject;

    constructor(object: RawKeyValueObject)
    {
        this.object = object;
    }

    public toFlat(): FlatKeyValueObject
    {
        const object: {[key in FlatObjectKeyType]: FlatObjectValueType} = {};
        const flat = this.makeItFlatter(this.object);

        for (const key of flat.keys()) {
            object[key.toString()] = flat.value(key) as FlatObjectValueType;
        }

        return new FlatKeyValueObject(object);
    }

    private makeItFlatter(rawObject: RawKeyValueObject, keyBuilder: KeyBuilder|null = null): RawKeyValueObject
    {
        let object: Object = {};

        if (null === keyBuilder) {
            keyBuilder = KeyBuilder.empty();
        }

        for (const key of rawObject.keys()) {
            const value = rawObject.value(key);
            const valueType = new Type(value);
            const valueKey = keyBuilder.append(key as string);

            if (valueType.isObject() && valueType.isNotNull()) {
                const valueObject = new RawKeyValueObject(value as Object);
                const valueObjectFlatExtractor = new Extractor(
                    this.makeItFlatter(valueObject, valueKey)
                );

                object = Object.assign(object, valueObjectFlatExtractor.getRawObject());

                continue;
            }

            object[valueKey.get()] = value;
        }

        return new RawKeyValueObject(object);
    }
}

export default Flatten

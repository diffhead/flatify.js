import KeyValueObject from "../Models/KeyValueObject";
import Object from "../Types/Object";
import ObjectKeyType from "../Types/ObjectKeyType";
import ObjectValueType from "../Types/ObjectValueType";

class Extractor
{
    private object: KeyValueObject<ObjectKeyType, ObjectValueType>;

    constructor(object: KeyValueObject<ObjectKeyType, ObjectValueType>)
    {
        this.object = object;
    }

    public getRawObject(): Object
    {
        const output: Object = {};

        for (const key of this.object.keys()) {
            output[key] = this.object.value(key);
        }

        return output;
    }
}

export default Extractor

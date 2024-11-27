import FlatKeyValueObject from "./Models/FlatKeyValueObject";
import RawKeyValueObject from "./Models/RawKeyValueObject";
import Convertor from "./Services/Convertor";
import Flatten from "./Services/Flatten";
import Object from "./Types/Object";

class FlatifyJS
{
    public static toFlatKeyValueObject(object: Object): FlatKeyValueObject
    {
        return new Flatten(new RawKeyValueObject(object)).toFlat();
    }

    public static toFormString(object: Object, name: string = 'object'): string
    {
        const flat = FlatifyJS.toFlatKeyValueObject(object);
        return new Convertor(flat).toFormString(name);
    }

    public static toUrlSearchParams(object: Object, name: string = 'object'): URLSearchParams
    {
        const flat = FlatifyJS.toFlatKeyValueObject(object);
        return new Convertor(flat).toUrlSearchParams(name);
    }
}

export default FlatifyJS

import FlatKeyValueObject from "../Models/FlatKeyValueObject";
import KeyModifier from "./KeyModifier";
import Type from "./Type";

class Convertor
{
    private object: FlatKeyValueObject;

    constructor(object: FlatKeyValueObject)
    {
        this.object = object;
    }

    public toFormString(rootKey: string = '', keepArrayIndexes: boolean = false): string
    {
        const parts: string[] = [];

        for (const key of this.object.keys()) {
            let value = this.object.value(key);
            const valueType = new Type(value);

            if (valueType.isObject() && valueType.isNull()) {
                value = '';
            } else if (valueType.isBoolean()) {
                value = value ? 1 : 0;
            }

            const valueKeyModifier = new KeyModifier(key);
            const valueKey = valueKeyModifier.dotSeparatorToBrackets(! keepArrayIndexes);
            const valueString = (value as string|symbol|number).toString();

            parts.push(`${rootKey}${valueKey}=${valueString}`);
        }

        return parts.join('&');
    }

    public toUrlSearchParams(rootKey: string = '', keepArrayIndexes: boolean = false): URLSearchParams
    {
        return new URLSearchParams(this.toFormString(rootKey, keepArrayIndexes));
    }
}

export default Convertor

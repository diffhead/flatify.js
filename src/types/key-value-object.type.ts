export type KeyValueObject<KeyType extends string|number|symbol, ValueType> = {
    [key in KeyType]: ValueType
}

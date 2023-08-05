import { KeyValueObject } from "./key-value-object.type"

export type FlatAvailableKeyValueObject = KeyValueObject<string, object|string|number|symbol|boolean|null>

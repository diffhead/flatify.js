import { KeyValueObject } from "./key-value-object.type"

export type FlatKeyValueObject = KeyValueObject<string, string|number|symbol|boolean|null>

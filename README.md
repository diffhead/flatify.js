# Flatify.js

> This is the simple library for flatifying the objects,
> converting them to form string, search params, etc.

## Usage

#### Installation

    npm install flatify.js

#### Import

    import { FlatObject, FlatTools, FlatKeyTools } from 'flatify.js'

## Flatify object
   
    const object = {
        configuration: {
            system: true,
            flags: [
                "isolated", "kernel", "module"
            ]
        }
    };
    
    const flat = new FlatObject(object);
    
## Convert it

    /**
     * @var urlSearchParams: URLSearchParams
     */
    const urlSearchParams = FlatTools.toUrlSearchParams(flat);
    
    /**
     * @var formParams: string
     * 
     * [configuration][system]=1&[configuration][flags][]=isolated&
     * [configuration][flags][]=kernel&
     * [configuration][flags][]=module
     */
    const formParams = FlatTools.toFormString(flat);

	/**
	 * Getting application/x-www-form-urlencoded string
	 */
	const formParamsUrlEncoded = FlatTools.toUrlSearchParams(flat).toString();
	
    /** 
     * @var flatKeyValueObject: FlatKeyValueObject = { 'a.b': 1 }
     */
    const flatKeyValueObject = FlatTools.toFlatKeyValueObject({
        a: {
            b: true
        }
    });
    
    /**
     * @var keyValueObject: KeyValueObject<string, string|number|symbol|object|null>
     */
    const keyValueObject = FlatTools.toKeyValueObject(flat);


## FlatObject API

    public listKeys():  Array<string>
    public hasKey(key:  string):  boolean
    public get(key:  string):  string|number|symbol|boolean|null
    public getRaw():  FlatAvailableKeyValueObject
    public getFlat():  FlatKeyValueObject

## FlatTools API

    public static toFlatKeyValueObject(object: FlatAvailableKeyValueObject, keyOfObject: string = ''): FlatKeyValueObject
    public static toFormString(object: FlatObject, keyOfObject: string = '', useArrayIndexes: boolean = false): string
    public static toUrlSearchParams(object: FlatObject, keyOfObject: string = '', useArrayIndexes: boolean = false): URLSearchParams
    public static toKeyValueObject(object: FlatObject): FlatAvailableKeyValueObject

## FlatKeyTools API

    public static getKeyFromParts(...parts: Array<string>): string
    public static getDotNotationKey(...parts:  Array<string>): string
    public static dotsToBrackets(key: string, removeArrayIndexes: boolean = true): string

## Types

    KeyValueObject<KeyType extends string|number|symbol, ValueType> =
    {
		[key  in  KeyType]:  ValueType
	}

	FlatKeyValueObject = KeyValueObject<string, string|number|symbol|boolean|null>
	FlatAvailableKeyValueObject = KeyValueObject<string, object|string|number|symbol|boolean|null>

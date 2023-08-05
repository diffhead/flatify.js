import { FlatObject } from "./flat-object.class";
import { FlatKeyTools } from "./flat-key-tools.class";

import { FlatAvailableKeyValueObject } from "../types/flat-available-key-value-object.type";
import { FlatKeyValueObject } from "../types/flat-key-value-object.type";

export class FlatTools
{
    /**
     * This method returns { 'a.b.c': 3, 'd': true } instead of { a: { b: { c: 3 } }, d: true }
     * 
     * @param object: object
     * @param objectKey: string = ''
     * 
     * @returns object
     */
    public static toFlatKeyValueObject(object: FlatAvailableKeyValueObject, keyOfObject: string = ''): FlatKeyValueObject
    {
        let flatObject: FlatKeyValueObject = {};

        for ( const key in object ) {
            const value = object[key];

            const separator = keyOfObject.trim().length ? '.' : '';
            const dotNotationKey = `${keyOfObject.trim()}${separator}${key}`;

            if ( 'object' === typeof value && null !== value ) {
                flatObject = Object.assign(flatObject, FlatTools.toFlatKeyValueObject(
                    value as FlatAvailableKeyValueObject, dotNotationKey
                ));
            }
            else {
                flatObject[dotNotationKey] = value;
            }
        }

        return flatObject;
    }
    /**
     * Passing useArrayIndexes as 'true' returns
     * string 'array[0]=1&array[1]=2&array[2]=3'
     * instead of 'array[]=1&array[]=2&array[]=3'
     * 
     * @param object: object 
     * @param keyOfObject: string = ''
     * @param useArrayIndexes: boolean = true
     * 
     * @returns string - example: '[configuration][drivers]=1&[configuration][memory]=64Kb&[enabled]=1'
     */
    public static toFormString(object: FlatObject, keyOfObject: string = '', useArrayIndexes: boolean = false): string
    {
        const parts: Array<string> = [];

        for ( const key of object.listKeys() ) {
            let value = object.get(key);

            const formKey = FlatKeyTools.getKeyFromParts(
                keyOfObject, FlatKeyTools.dotsToBrackets(key, useArrayIndexes ? false : true)
            );

            if ( 'object' === typeof value ) {
                if ( null === value ) {
                    value = '';
                }
            }
            else {
                if ( 'boolean' === typeof value ) {
                    value = value ? 1 : 0;
                }
            }

            parts.push(`${formKey}=${value.toString()}`);
        }

        return parts.join('&');
    }
    /**
     * This method returns
     * URLSearchParams instead of FlatObject instance
     * 
     * @param object: object
     * @param keyOfObject: string = ''
     * @param useArrayIndexes: boolean = false
     * 
     * @returns URLSearchParams
     */
    public static toUrlSearchParams(object: FlatObject, keyOfObject: string = '', useArrayIndexes: boolean = false): URLSearchParams
    {
        return new URLSearchParams(FlatTools.toFormString(object, keyOfObject, useArrayIndexes));
    }
    /**
     * This method returns normal key value
     * object instead of FlatObject instances
     * 
     * @param object: object - FlatObject instance
     *
     * @returns object - normal key value object
     */
    public static toKeyValueObject(object: FlatObject): FlatAvailableKeyValueObject
    {
        let normal: FlatAvailableKeyValueObject = {};

        for ( const key of object.listKeys() ) {
            const entities: Array<string> = key.split('.');
            const entitiesCount = entities.length;

            let temp: FlatAvailableKeyValueObject = {};

            for ( let i = 0; i < entitiesCount; i++ ) {
                const entity = entities[i];

                if ( i === 0 ) {
                    if ( false === normal.hasOwnProperty(entity) ) {
                        normal[entity] = {};
                    }
                    
                    temp = normal[entity] as FlatAvailableKeyValueObject;
                }
                else if ( i < entitiesCount -1 ) {
                    if ( false === temp.hasOwnProperty(entity) ) {
                        temp[entity] = {};
                    }

                    temp = temp[entity] as FlatAvailableKeyValueObject;
                }
                else {
                    temp[entity] = object.get(key);
                }
            }
        }

        return normal;
    }
}

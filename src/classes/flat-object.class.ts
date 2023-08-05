import { FlatAvailableKeyValueObject } from "../types/flat-available-key-value-object.type";
import { FlatKeyValueObject } from '../types/flat-key-value-object.type';

import { FlatTools } from "./flat-tools.class";

export class FlatObject
{
    private raw: FlatAvailableKeyValueObject;
    private flat: FlatKeyValueObject = {};
    private keys: Array<string> = [];

    constructor(raw: FlatAvailableKeyValueObject)
    {
        this.raw = raw;

        this.initFlatObject();
    }

    public listKeys(): Array<string>
    {
        return this.keys;
    }

    public hasKey(key: string): boolean
    {
        return this.keys.includes(key);
    }

    public get(key: string): string|number|symbol|boolean|null
    {
        if ( false === this.hasKey(key) ) {
            return null;
        }

        return this.flat[key];
    }

    public getRaw(): FlatAvailableKeyValueObject
    {
        return this.raw;
    }

    public getFlat(): FlatKeyValueObject
    {
        return this.flat;
    }

    private initFlatObject(): void
    {
        if ( 'object' !== typeof this.raw || null === this.raw ) {
            throw new Error('Raw must be a key value object');
        }

        this.flat = FlatTools.toFlatKeyValueObject(this.raw);
        this.keys = Object.keys(this.flat);
    }
}

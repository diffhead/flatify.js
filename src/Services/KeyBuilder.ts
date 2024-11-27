class KeyBuilder
{
    private key: string;

    public static empty(): KeyBuilder
    {
        return new KeyBuilder();
    }

    constructor(key: string = '') {
        this.key = key;
    }

    public get(): string
    {
        return this.key;
    }

    public append(part: string): KeyBuilder
    {
        return new KeyBuilder(this.concat(this.get(), this.separator(), part));
    }

    private separator(defaultSeparator: string = '.', emptySeparator: string = ''): string
    {
        return this.key.length ? defaultSeparator : emptySeparator;
    }

    private concat(firstPart: string, separator: string, secondPart: string): string
    {
        return [firstPart, separator, secondPart].join('');
    }
}

export default KeyBuilder

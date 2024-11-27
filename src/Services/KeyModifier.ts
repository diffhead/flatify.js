class KeyModifier
{
    private key: string;

    constructor(key: string)
    {
        this.key = key;
    }

    public dotSeparatorToBrackets(clearArrayIndexes: boolean = true): string
    {
        let keyBracketsSeparated = '';

        for (const part of this.key.split('.')) {
            if (clearArrayIndexes && part.match(/^\d{1,}$/)) {
                keyBracketsSeparated += `[]`;
            }
            else {
                keyBracketsSeparated += `[${part}]`;
            }
        }

        return keyBracketsSeparated;
    }
}

export default KeyModifier

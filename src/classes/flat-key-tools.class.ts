export class FlatKeyTools
{
    public static getKeyFromParts(...parts: Array<string>): string
    {
        return parts.join('');
    }

    public static getDotNotationKey(...parts: Array<string>): string
    {
        return parts.join('.');
    }

    public static dotsToBrackets(key: string, removeArrayIndexes: boolean = true): string
    {
        let stringWithBrackets = '';

        for ( const part of key.split('.') ) {
            if ( removeArrayIndexes && part.match(/^\d{1,}$/) ) {
                stringWithBrackets += `[]`;
            }
            else {
                stringWithBrackets += `[${part}]`;
            }
        }

        return stringWithBrackets;
    }
}

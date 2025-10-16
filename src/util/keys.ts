export function getKeyName(...args: string[]) {
    return `bytes:${args.join(':')}`;
}
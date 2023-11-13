export const deepClone = <T>(item: T): T => {
    return JSON.parse(JSON.stringify(item))
}
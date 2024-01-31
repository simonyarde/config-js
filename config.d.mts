/**
 * Returns a config object for the supplied object.
 *
 * String tokens e.g. `{{token-name}}` are replaced with matching properties
 * from the supplied vars maps.
 *
 * An error is thrown if a token's name is not found in the supplied vars maps.
 */
export function readConfigObject(x: object, ...vars: { [key: string]: any }[]): object
/**
 * Returns a config object for the supplied JSON string.
 *
 * String tokens e.g. `{{token-name}}` are replaced with matching properties
 * from the supplied vars maps.
 *
 * An error is thrown if a token's name is not found in the supplied vars maps.
 */
export function readConfigString(x: string, ...vars: { [key: string]: any }[]): object
/**
 * Returns a config object for the JSON file at the supplied path.
 * The file must use UTF-8 char encoding.
 * 
 * String tokens e.g. `{{token-name}}` are replaced with matching properties
 * from the supplied vars maps.
 *
 * An error is thrown if a token's name is not found in the supplied vars maps.
 */
export function readConfigFile(path: string, ...vars: { [key: string]: any }[]): Promise<object>
/**
 * Returns a config object for the JSON file at the supplied path.
 * The file must use UTF-8 char encoding.
 * 
 * String tokens e.g. `{{token-name}}` are replaced with matching properties
 * from the supplied vars maps.
 *
 * An error is thrown if a token's name is not found in the supplied vars maps.
 */
export function readConfigFileSync(path: string, ...vars: { [key: string]: any }[]): object

/* tslint:disable */
/* eslint-disable */
/**
 * ILP API
 * Internal Loyalty Program API Specification
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 */
export const EScope = {
    Activity: 'activity',
    Article: 'article',
    Profile: 'profile',
} as const;
export type EScope = (typeof EScope)[keyof typeof EScope];

export function EScopeFromJSON(json: any): EScope {
    return EScopeFromJSONTyped(json, false);
}

export function EScopeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EScope {
    return json as EScope;
}

export function EScopeToJSON(value?: EScope | null): any {
    return value as any;
}
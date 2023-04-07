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

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface GetProfileByIdAsAdmin200ResponseAllOf
 */
export interface GetProfileByIdAsAdmin200ResponseAllOf {
    /**
     *
     * @type {number}
     * @memberof GetProfileByIdAsAdmin200ResponseAllOf
     */
    balance: number;
}

/**
 * Check if a given object implements the GetProfileByIdAsAdmin200ResponseAllOf interface.
 */
export function instanceOfGetProfileByIdAsAdmin200ResponseAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'balance' in value;

    return isInstance;
}

export function GetProfileByIdAsAdmin200ResponseAllOfFromJSON(json: any): GetProfileByIdAsAdmin200ResponseAllOf {
    return GetProfileByIdAsAdmin200ResponseAllOfFromJSONTyped(json, false);
}

export function GetProfileByIdAsAdmin200ResponseAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): GetProfileByIdAsAdmin200ResponseAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        balance: json['balance'],
    };
}

export function GetProfileByIdAsAdmin200ResponseAllOfToJSON(value?: GetProfileByIdAsAdmin200ResponseAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        balance: value.balance,
    };
}

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
 * @interface TokenRefreshRequest
 */
export interface TokenRefreshRequest {
    /**
     * token used to refresh expired jwt
     * @type {string}
     * @memberof TokenRefreshRequest
     */
    refreshToken: string;
}

/**
 * Check if a given object implements the TokenRefreshRequest interface.
 */
export function instanceOfTokenRefreshRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'refreshToken' in value;

    return isInstance;
}

export function TokenRefreshRequestFromJSON(json: any): TokenRefreshRequest {
    return TokenRefreshRequestFromJSONTyped(json, false);
}

export function TokenRefreshRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenRefreshRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        refreshToken: json['refreshToken'],
    };
}

export function TokenRefreshRequestToJSON(value?: TokenRefreshRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        refreshToken: value.refreshToken,
    };
}

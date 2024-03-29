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

import { ERoleFromJSON, ERoleFromJSONTyped, ERoleToJSON } from './ERole';
import { exists, mapValues } from '../runtime';

import type { ERole } from './ERole';

/**
 *
 * @export
 * @interface JwtResponse
 */
export interface JwtResponse {
    /**
     * authorized jwt token
     * @type {string}
     * @memberof JwtResponse
     */
    token: string;
    /**
     * token to refresh expired jwt
     * @type {string}
     * @memberof JwtResponse
     */
    refreshToken: string;
    /**
     * user email (unique)
     * @type {string}
     * @memberof JwtResponse
     */
    email: string;
    /**
     *
     * @type {Set<ERole>}
     * @memberof JwtResponse
     */
    roles: Set<ERole>;
}

/**
 * Check if a given object implements the JwtResponse interface.
 */
export function instanceOfJwtResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'token' in value;
    isInstance = isInstance && 'refreshToken' in value;
    isInstance = isInstance && 'email' in value;
    isInstance = isInstance && 'roles' in value;

    return isInstance;
}

export function JwtResponseFromJSON(json: any): JwtResponse {
    return JwtResponseFromJSONTyped(json, false);
}

export function JwtResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): JwtResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        token: json['token'],
        refreshToken: json['refreshToken'],
        email: json['email'],
        roles: new Set((json['roles'] as Array<any>).map(ERoleFromJSON)),
    };
}

export function JwtResponseToJSON(value?: JwtResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        token: value.token,
        refreshToken: value.refreshToken,
        email: value.email,
        roles: Array.from(value.roles as Set<any>).map(ERoleToJSON),
    };
}

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
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * user email
     * @type {string}
     * @memberof LoginRequest
     */
    email: string;
    /**
     * user password
     * @type {string}
     * @memberof LoginRequest
     */
    password: string;
}

/**
 * Check if a given object implements the LoginRequest interface.
 */
export function instanceOfLoginRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'email' in value;
    isInstance = isInstance && 'password' in value;

    return isInstance;
}

export function LoginRequestFromJSON(json: any): LoginRequest {
    return LoginRequestFromJSONTyped(json, false);
}

export function LoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        email: json['email'],
        password: json['password'],
    };
}

export function LoginRequestToJSON(value?: LoginRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        email: value.email,
        password: value.password,
    };
}

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
import { NameFromJSON, NameFromJSONTyped, NameToJSON } from './Name';
import { exists, mapValues } from '../runtime';

import type { ERole } from './ERole';
import type { Name } from './Name';

/**
 *
 * @export
 * @interface SignupRequest
 */
export interface SignupRequest {
    /**
     *
     * @type {Name}
     * @memberof SignupRequest
     */
    name?: Name;
    /**
     * user email
     * @type {string}
     * @memberof SignupRequest
     */
    email?: string;
    /**
     * user password
     * @type {string}
     * @memberof SignupRequest
     */
    password?: string;
    /**
     *
     * @type {Array<ERole>}
     * @memberof SignupRequest
     */
    roles?: Array<ERole>;
}

/**
 * Check if a given object implements the SignupRequest interface.
 */
export function instanceOfSignupRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SignupRequestFromJSON(json: any): SignupRequest {
    return SignupRequestFromJSONTyped(json, false);
}

export function SignupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignupRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        name: !exists(json, 'name') ? undefined : NameFromJSON(json['name']),
        email: !exists(json, 'email') ? undefined : json['email'],
        password: !exists(json, 'password') ? undefined : json['password'],
        roles: !exists(json, 'roles') ? undefined : (json['roles'] as Array<any>).map(ERoleFromJSON),
    };
}

export function SignupRequestToJSON(value?: SignupRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        name: NameToJSON(value.name),
        email: value.email,
        password: value.password,
        roles: value.roles === undefined ? undefined : (value.roles as Array<any>).map(ERoleToJSON),
    };
}

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

import { WriteOffResponseFromJSON, WriteOffResponseFromJSONTyped, WriteOffResponseToJSON } from './WriteOffResponse';
import { exists, mapValues } from '../runtime';

import type { WriteOffResponse } from './WriteOffResponse';

/**
 *
 * @export
 * @interface PaginatedAdminWriteOffResponseAllOf
 */
export interface PaginatedAdminWriteOffResponseAllOf {
    /**
     *
     * @type {Array<WriteOffResponse>}
     * @memberof PaginatedAdminWriteOffResponseAllOf
     */
    results?: Array<WriteOffResponse>;
}

/**
 * Check if a given object implements the PaginatedAdminWriteOffResponseAllOf interface.
 */
export function instanceOfPaginatedAdminWriteOffResponseAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedAdminWriteOffResponseAllOfFromJSON(json: any): PaginatedAdminWriteOffResponseAllOf {
    return PaginatedAdminWriteOffResponseAllOfFromJSONTyped(json, false);
}

export function PaginatedAdminWriteOffResponseAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedAdminWriteOffResponseAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        results: !exists(json, 'results') ? undefined : (json['results'] as Array<any>).map(WriteOffResponseFromJSON),
    };
}

export function PaginatedAdminWriteOffResponseAllOfToJSON(value?: PaginatedAdminWriteOffResponseAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        results: value.results === undefined ? undefined : (value.results as Array<any>).map(WriteOffResponseToJSON),
    };
}

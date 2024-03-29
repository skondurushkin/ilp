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

import { AccrualResponseFromJSON, AccrualResponseFromJSONTyped, AccrualResponseToJSON } from './AccrualResponse';
import { exists, mapValues } from '../runtime';

import type { AccrualResponse } from './AccrualResponse';

/**
 *
 * @export
 * @interface PaginatedAccrualResponseAllOf
 */
export interface PaginatedAccrualResponseAllOf {
    /**
     *
     * @type {Array<AccrualResponse>}
     * @memberof PaginatedAccrualResponseAllOf
     */
    results?: Array<AccrualResponse>;
}

/**
 * Check if a given object implements the PaginatedAccrualResponseAllOf interface.
 */
export function instanceOfPaginatedAccrualResponseAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedAccrualResponseAllOfFromJSON(json: any): PaginatedAccrualResponseAllOf {
    return PaginatedAccrualResponseAllOfFromJSONTyped(json, false);
}

export function PaginatedAccrualResponseAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedAccrualResponseAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        results: !exists(json, 'results') ? undefined : (json['results'] as Array<any>).map(AccrualResponseFromJSON),
    };
}

export function PaginatedAccrualResponseAllOfToJSON(value?: PaginatedAccrualResponseAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        results: value.results === undefined ? undefined : (value.results as Array<any>).map(AccrualResponseToJSON),
    };
}

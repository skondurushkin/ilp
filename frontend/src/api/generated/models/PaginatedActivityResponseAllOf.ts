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

import { ActivityResponseFromJSON, ActivityResponseFromJSONTyped, ActivityResponseToJSON } from './ActivityResponse';
import { exists, mapValues } from '../runtime';

import type { ActivityResponse } from './ActivityResponse';

/**
 *
 * @export
 * @interface PaginatedActivityResponseAllOf
 */
export interface PaginatedActivityResponseAllOf {
    /**
     *
     * @type {Array<ActivityResponse>}
     * @memberof PaginatedActivityResponseAllOf
     */
    results?: Array<ActivityResponse>;
}

/**
 * Check if a given object implements the PaginatedActivityResponseAllOf interface.
 */
export function instanceOfPaginatedActivityResponseAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedActivityResponseAllOfFromJSON(json: any): PaginatedActivityResponseAllOf {
    return PaginatedActivityResponseAllOfFromJSONTyped(json, false);
}

export function PaginatedActivityResponseAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedActivityResponseAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        results: !exists(json, 'results') ? undefined : (json['results'] as Array<any>).map(ActivityResponseFromJSON),
    };
}

export function PaginatedActivityResponseAllOfToJSON(value?: PaginatedActivityResponseAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        results: value.results === undefined ? undefined : (value.results as Array<any>).map(ActivityResponseToJSON),
    };
}
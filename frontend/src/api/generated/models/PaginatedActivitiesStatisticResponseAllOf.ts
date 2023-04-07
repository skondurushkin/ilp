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

import {
    ActivityStatisticResponseFromJSON,
    ActivityStatisticResponseFromJSONTyped,
    ActivityStatisticResponseToJSON,
} from './ActivityStatisticResponse';
import { exists, mapValues } from '../runtime';

import type { ActivityStatisticResponse } from './ActivityStatisticResponse';

/**
 *
 * @export
 * @interface PaginatedActivitiesStatisticResponseAllOf
 */
export interface PaginatedActivitiesStatisticResponseAllOf {
    /**
     *
     * @type {Array<ActivityStatisticResponse>}
     * @memberof PaginatedActivitiesStatisticResponseAllOf
     */
    results?: Array<ActivityStatisticResponse>;
}

/**
 * Check if a given object implements the PaginatedActivitiesStatisticResponseAllOf interface.
 */
export function instanceOfPaginatedActivitiesStatisticResponseAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedActivitiesStatisticResponseAllOfFromJSON(
    json: any,
): PaginatedActivitiesStatisticResponseAllOf {
    return PaginatedActivitiesStatisticResponseAllOfFromJSONTyped(json, false);
}

export function PaginatedActivitiesStatisticResponseAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedActivitiesStatisticResponseAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        results: !exists(json, 'results')
            ? undefined
            : (json['results'] as Array<any>).map(ActivityStatisticResponseFromJSON),
    };
}

export function PaginatedActivitiesStatisticResponseAllOfToJSON(
    value?: PaginatedActivitiesStatisticResponseAllOf | null,
): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        results:
            value.results === undefined
                ? undefined
                : (value.results as Array<any>).map(ActivityStatisticResponseToJSON),
    };
}

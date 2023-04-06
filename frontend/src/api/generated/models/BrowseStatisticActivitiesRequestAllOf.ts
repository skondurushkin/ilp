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
 * @interface BrowseStatisticActivitiesRequestAllOf
 */
export interface BrowseStatisticActivitiesRequestAllOf {
    /**
     *
     * @type {string}
     * @memberof BrowseStatisticActivitiesRequestAllOf
     */
    period?: BrowseStatisticActivitiesRequestAllOfPeriodEnum;
}

/**
 * @export
 */
export const BrowseStatisticActivitiesRequestAllOfPeriodEnum = {
    Day: 'day',
    All: 'all',
} as const;
export type BrowseStatisticActivitiesRequestAllOfPeriodEnum =
    (typeof BrowseStatisticActivitiesRequestAllOfPeriodEnum)[keyof typeof BrowseStatisticActivitiesRequestAllOfPeriodEnum];

/**
 * Check if a given object implements the BrowseStatisticActivitiesRequestAllOf interface.
 */
export function instanceOfBrowseStatisticActivitiesRequestAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BrowseStatisticActivitiesRequestAllOfFromJSON(json: any): BrowseStatisticActivitiesRequestAllOf {
    return BrowseStatisticActivitiesRequestAllOfFromJSONTyped(json, false);
}

export function BrowseStatisticActivitiesRequestAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): BrowseStatisticActivitiesRequestAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        period: !exists(json, 'period') ? undefined : json['period'],
    };
}

export function BrowseStatisticActivitiesRequestAllOfToJSON(value?: BrowseStatisticActivitiesRequestAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        period: value.period,
    };
}
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
    PageRequestConfigFromJSON,
    PageRequestConfigFromJSONTyped,
    PageRequestConfigToJSON,
} from './PageRequestConfig';
import { exists, mapValues } from '../runtime';

import type { PageRequestConfig } from './PageRequestConfig';

/**
 *
 * @export
 * @interface BrowseStatisticActivitiesRequest
 */
export interface BrowseStatisticActivitiesRequest {
    /**
     * index of the page to load
     * @type {number}
     * @memberof BrowseStatisticActivitiesRequest
     */
    page: number;
    /**
     * max number of result rows per page
     * @type {number}
     * @memberof BrowseStatisticActivitiesRequest
     */
    pageSize: number;
    /**
     *
     * @type {PageRequestConfig}
     * @memberof BrowseStatisticActivitiesRequest
     */
    config?: PageRequestConfig;
    /**
     *
     * @type {string}
     * @memberof BrowseStatisticActivitiesRequest
     */
    period?: BrowseStatisticActivitiesRequestPeriodEnum;
}

/**
 * @export
 */
export const BrowseStatisticActivitiesRequestPeriodEnum = {
    Day: 'day',
    All: 'all',
} as const;
export type BrowseStatisticActivitiesRequestPeriodEnum =
    (typeof BrowseStatisticActivitiesRequestPeriodEnum)[keyof typeof BrowseStatisticActivitiesRequestPeriodEnum];

/**
 * Check if a given object implements the BrowseStatisticActivitiesRequest interface.
 */
export function instanceOfBrowseStatisticActivitiesRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'page' in value;
    isInstance = isInstance && 'pageSize' in value;

    return isInstance;
}

export function BrowseStatisticActivitiesRequestFromJSON(json: any): BrowseStatisticActivitiesRequest {
    return BrowseStatisticActivitiesRequestFromJSONTyped(json, false);
}

export function BrowseStatisticActivitiesRequestFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): BrowseStatisticActivitiesRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        page: json['page'],
        pageSize: json['pageSize'],
        config: !exists(json, 'config') ? undefined : PageRequestConfigFromJSON(json['config']),
        period: !exists(json, 'period') ? undefined : json['period'],
    };
}

export function BrowseStatisticActivitiesRequestToJSON(value?: BrowseStatisticActivitiesRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        page: value.page,
        pageSize: value.pageSize,
        config: PageRequestConfigToJSON(value.config),
        period: value.period,
    };
}

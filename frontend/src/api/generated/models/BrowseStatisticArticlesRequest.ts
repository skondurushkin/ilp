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
 * @interface BrowseStatisticArticlesRequest
 */
export interface BrowseStatisticArticlesRequest {
    /**
     * index of the page to load
     * @type {number}
     * @memberof BrowseStatisticArticlesRequest
     */
    page: number;
    /**
     * max number of result rows per page
     * @type {number}
     * @memberof BrowseStatisticArticlesRequest
     */
    pageSize: number;
    /**
     *
     * @type {PageRequestConfig}
     * @memberof BrowseStatisticArticlesRequest
     */
    config?: PageRequestConfig;
    /**
     *
     * @type {string}
     * @memberof BrowseStatisticArticlesRequest
     */
    period?: BrowseStatisticArticlesRequestPeriodEnum;
    /**
     * default "DESC"
     * @type {string}
     * @memberof BrowseStatisticArticlesRequest
     */
    sort?: BrowseStatisticArticlesRequestSortEnum;
}

/**
 * @export
 */
export const BrowseStatisticArticlesRequestPeriodEnum = {
    Day: 'day',
    All: 'all',
} as const;
export type BrowseStatisticArticlesRequestPeriodEnum =
    (typeof BrowseStatisticArticlesRequestPeriodEnum)[keyof typeof BrowseStatisticArticlesRequestPeriodEnum];

/**
 * @export
 */
export const BrowseStatisticArticlesRequestSortEnum = {
    Asc: 'ASC',
    Desc: 'DESC',
} as const;
export type BrowseStatisticArticlesRequestSortEnum =
    (typeof BrowseStatisticArticlesRequestSortEnum)[keyof typeof BrowseStatisticArticlesRequestSortEnum];

/**
 * Check if a given object implements the BrowseStatisticArticlesRequest interface.
 */
export function instanceOfBrowseStatisticArticlesRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'page' in value;
    isInstance = isInstance && 'pageSize' in value;

    return isInstance;
}

export function BrowseStatisticArticlesRequestFromJSON(json: any): BrowseStatisticArticlesRequest {
    return BrowseStatisticArticlesRequestFromJSONTyped(json, false);
}

export function BrowseStatisticArticlesRequestFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): BrowseStatisticArticlesRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        page: json['page'],
        pageSize: json['pageSize'],
        config: !exists(json, 'config') ? undefined : PageRequestConfigFromJSON(json['config']),
        period: !exists(json, 'period') ? undefined : json['period'],
        sort: !exists(json, 'sort') ? undefined : json['sort'],
    };
}

export function BrowseStatisticArticlesRequestToJSON(value?: BrowseStatisticArticlesRequest | null): any {
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
        sort: value.sort,
    };
}

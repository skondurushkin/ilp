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
import type { ActivityResponse } from './ActivityResponse';
import {
    ActivityResponseFromJSON,
    ActivityResponseFromJSONTyped,
    ActivityResponseToJSON,
} from './ActivityResponse';

/**
 * 
 * @export
 * @interface PaginatedActivityResponse
 */
export interface PaginatedActivityResponse {
    /**
     * 
     * @type {number}
     * @memberof PaginatedActivityResponse
     */
    total: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedActivityResponse
     */
    page: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedActivityResponse
     */
    pageSize: number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedActivityResponse
     */
    pageCount: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginatedActivityResponse
     */
    hasNext: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginatedActivityResponse
     */
    hasPrev: boolean;
    /**
     * 
     * @type {Array<ActivityResponse>}
     * @memberof PaginatedActivityResponse
     */
    results: Array<ActivityResponse>;
}

/**
 * Check if a given object implements the PaginatedActivityResponse interface.
 */
export function instanceOfPaginatedActivityResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "total" in value;
    isInstance = isInstance && "page" in value;
    isInstance = isInstance && "pageSize" in value;
    isInstance = isInstance && "pageCount" in value;
    isInstance = isInstance && "hasNext" in value;
    isInstance = isInstance && "hasPrev" in value;
    isInstance = isInstance && "results" in value;

    return isInstance;
}

export function PaginatedActivityResponseFromJSON(json: any): PaginatedActivityResponse {
    return PaginatedActivityResponseFromJSONTyped(json, false);
}

export function PaginatedActivityResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedActivityResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'total': json['total'],
        'page': json['page'],
        'pageSize': json['pageSize'],
        'pageCount': json['pageCount'],
        'hasNext': json['hasNext'],
        'hasPrev': json['hasPrev'],
        'results': ((json['results'] as Array<any>).map(ActivityResponseFromJSON)),
    };
}

export function PaginatedActivityResponseToJSON(value?: PaginatedActivityResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'total': value.total,
        'page': value.page,
        'pageSize': value.pageSize,
        'pageCount': value.pageCount,
        'hasNext': value.hasNext,
        'hasPrev': value.hasPrev,
        'results': ((value.results as Array<any>).map(ActivityResponseToJSON)),
    };
}


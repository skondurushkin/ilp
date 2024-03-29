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
 * @interface SearchedResultAllOf
 */
export interface SearchedResultAllOf {
    /**
     * current page
     * @type {number}
     * @memberof SearchedResultAllOf
     */
    currentPage: number;
}

/**
 * Check if a given object implements the SearchedResultAllOf interface.
 */
export function instanceOfSearchedResultAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'currentPage' in value;

    return isInstance;
}

export function SearchedResultAllOfFromJSON(json: any): SearchedResultAllOf {
    return SearchedResultAllOfFromJSONTyped(json, false);
}

export function SearchedResultAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchedResultAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        currentPage: json['currentPage'],
    };
}

export function SearchedResultAllOfToJSON(value?: SearchedResultAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        currentPage: value.currentPage,
    };
}

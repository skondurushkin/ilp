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

import { WriteOffStatusFromJSON, WriteOffStatusFromJSONTyped, WriteOffStatusToJSON } from './WriteOffStatus';
import { exists, mapValues } from '../runtime';

import type { WriteOffStatus } from './WriteOffStatus';

/**
 *
 * @export
 * @interface BrowseWriteOffsRequestAllOf
 */
export interface BrowseWriteOffsRequestAllOf {
    /**
     *
     * @type {Set<WriteOffStatus>}
     * @memberof BrowseWriteOffsRequestAllOf
     */
    status?: Set<WriteOffStatus>;
}

/**
 * Check if a given object implements the BrowseWriteOffsRequestAllOf interface.
 */
export function instanceOfBrowseWriteOffsRequestAllOf(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BrowseWriteOffsRequestAllOfFromJSON(json: any): BrowseWriteOffsRequestAllOf {
    return BrowseWriteOffsRequestAllOfFromJSONTyped(json, false);
}

export function BrowseWriteOffsRequestAllOfFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): BrowseWriteOffsRequestAllOf {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        status: !exists(json, 'status')
            ? undefined
            : new Set((json['status'] as Array<any>).map(WriteOffStatusFromJSON)),
    };
}

export function BrowseWriteOffsRequestAllOfToJSON(value?: BrowseWriteOffsRequestAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        status: value.status === undefined ? undefined : Array.from(value.status as Set<any>).map(WriteOffStatusToJSON),
    };
}
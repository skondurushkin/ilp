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
 * @interface UsersStatisticResponseDataInner
 */
export interface UsersStatisticResponseDataInner {
    /**
     *
     * @type {Date}
     * @memberof UsersStatisticResponseDataInner
     */
    date: Date;
    /**
     *
     * @type {number}
     * @memberof UsersStatisticResponseDataInner
     */
    count: number;
}

/**
 * Check if a given object implements the UsersStatisticResponseDataInner interface.
 */
export function instanceOfUsersStatisticResponseDataInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'date' in value;
    isInstance = isInstance && 'count' in value;

    return isInstance;
}

export function UsersStatisticResponseDataInnerFromJSON(json: any): UsersStatisticResponseDataInner {
    return UsersStatisticResponseDataInnerFromJSONTyped(json, false);
}

export function UsersStatisticResponseDataInnerFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): UsersStatisticResponseDataInner {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        date: new Date(json['date']),
        count: json['count'],
    };
}

export function UsersStatisticResponseDataInnerToJSON(value?: UsersStatisticResponseDataInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        date: value.date.toISOString().substr(0, 10),
        count: value.count,
    };
}

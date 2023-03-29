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
 * @interface AccrualResponse
 */
export interface AccrualResponse {
    /**
     * generic identifier
     * @type {number}
     * @memberof AccrualResponse
     */
    id?: number;
    /**
     * generic identifier
     * @type {number}
     * @memberof AccrualResponse
     */
    activityId?: number;
    /**
     *
     * @type {Date}
     * @memberof AccrualResponse
     */
    date: Date;
    /**
     *
     * @type {string}
     * @memberof AccrualResponse
     */
    activityName: string;
    /**
     * generic amount
     * @type {number}
     * @memberof AccrualResponse
     */
    amount: number;
    /**
     *
     * @type {string}
     * @memberof AccrualResponse
     */
    logoLink?: string | null;
}

/**
 * Check if a given object implements the AccrualResponse interface.
 */
export function instanceOfAccrualResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'date' in value;
    isInstance = isInstance && 'activityName' in value;
    isInstance = isInstance && 'amount' in value;

    return isInstance;
}

export function AccrualResponseFromJSON(json: any): AccrualResponse {
    return AccrualResponseFromJSONTyped(json, false);
}

export function AccrualResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccrualResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: !exists(json, 'id') ? undefined : json['id'],
        activityId: !exists(json, 'activityId') ? undefined : json['activityId'],
        date: new Date(json['date']),
        activityName: json['activityName'],
        amount: json['amount'],
        logoLink: !exists(json, 'logoLink') ? undefined : json['logoLink'],
    };
}

export function AccrualResponseToJSON(value?: AccrualResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        activityId: value.activityId,
        date: value.date.toISOString().substr(0, 10),
        activityName: value.activityName,
        amount: value.amount,
        logoLink: value.logoLink,
    };
}

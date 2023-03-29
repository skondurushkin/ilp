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
 * @interface ActivityResponse
 */
export interface ActivityResponse {
    /**
     * generic identifier
     * @type {number}
     * @memberof ActivityResponse
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof ActivityResponse
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ActivityResponse
     */
    description?: string;
    /**
     *
     * @type {number}
     * @memberof ActivityResponse
     */
    price?: number | null;
    /**
     *
     * @type {string}
     * @memberof ActivityResponse
     */
    logoLink?: string;
    /**
     *
     * @type {Date}
     * @memberof ActivityResponse
     */
    startDate?: Date;
    /**
     *
     * @type {Date}
     * @memberof ActivityResponse
     */
    endDate?: Date;
}

/**
 * Check if a given object implements the ActivityResponse interface.
 */
export function instanceOfActivityResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'name' in value;

    return isInstance;
}

export function ActivityResponseFromJSON(json: any): ActivityResponse {
    return ActivityResponseFromJSONTyped(json, false);
}

export function ActivityResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActivityResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: !exists(json, 'id') ? undefined : json['id'],
        name: json['name'],
        description: !exists(json, 'description') ? undefined : json['description'],
        price: !exists(json, 'price') ? undefined : json['price'],
        logoLink: !exists(json, 'logoLink') ? undefined : json['logoLink'],
        startDate: !exists(json, 'startDate') ? undefined : new Date(json['startDate']),
        endDate: !exists(json, 'endDate') ? undefined : new Date(json['endDate']),
    };
}

export function ActivityResponseToJSON(value?: ActivityResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        name: value.name,
        description: value.description,
        price: value.price,
        logoLink: value.logoLink,
        startDate: value.startDate === undefined ? undefined : value.startDate.toISOString().substr(0, 10),
        endDate: value.endDate === undefined ? undefined : value.endDate.toISOString().substr(0, 10),
    };
}
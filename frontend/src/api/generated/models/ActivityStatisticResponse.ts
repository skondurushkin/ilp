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
 * @interface ActivityStatisticResponse
 */
export interface ActivityStatisticResponse {
    /**
     * generic identifier
     * @type {number}
     * @memberof ActivityStatisticResponse
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof ActivityStatisticResponse
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ActivityStatisticResponse
     */
    description?: string;
    /**
     *
     * @type {number}
     * @memberof ActivityStatisticResponse
     */
    price: number;
    /**
     *
     * @type {Date}
     * @memberof ActivityStatisticResponse
     */
    startDate?: Date;
    /**
     *
     * @type {Date}
     * @memberof ActivityStatisticResponse
     */
    endDate?: Date;
    /**
     *
     * @type {object}
     * @memberof ActivityStatisticResponse
     */
    extension?: object;
    /**
     *
     * @type {number}
     * @memberof ActivityStatisticResponse
     */
    count: number;
    /**
     * the entity is available for actions
     * @type {boolean}
     * @memberof ActivityStatisticResponse
     */
    active: boolean;
}

/**
 * Check if a given object implements the ActivityStatisticResponse interface.
 */
export function instanceOfActivityStatisticResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'id' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'price' in value;
    isInstance = isInstance && 'count' in value;
    isInstance = isInstance && 'active' in value;

    return isInstance;
}

export function ActivityStatisticResponseFromJSON(json: any): ActivityStatisticResponse {
    return ActivityStatisticResponseFromJSONTyped(json, false);
}

export function ActivityStatisticResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): ActivityStatisticResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: json['id'],
        name: json['name'],
        description: !exists(json, 'description') ? undefined : json['description'],
        price: json['price'],
        startDate: !exists(json, 'startDate') ? undefined : new Date(json['startDate']),
        endDate: !exists(json, 'endDate') ? undefined : new Date(json['endDate']),
        extension: !exists(json, 'extension') ? undefined : json['extension'],
        count: json['count'],
        active: json['active'],
    };
}

export function ActivityStatisticResponseToJSON(value?: ActivityStatisticResponse | null): any {
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
        startDate: value.startDate === undefined ? undefined : value.startDate.toISOString().substr(0, 10),
        endDate: value.endDate === undefined ? undefined : value.endDate.toISOString().substr(0, 10),
        extension: value.extension,
        count: value.count,
        active: value.active,
    };
}

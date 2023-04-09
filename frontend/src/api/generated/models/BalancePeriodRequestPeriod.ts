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
 * @interface BalancePeriodRequestPeriod
 */
export interface BalancePeriodRequestPeriod {
    /**
     *
     * @type {string}
     * @memberof BalancePeriodRequestPeriod
     */
    start: string;
    /**
     *
     * @type {string}
     * @memberof BalancePeriodRequestPeriod
     */
    end: string;
    /**
     *
     * @type {string}
     * @memberof BalancePeriodRequestPeriod
     */
    interval: BalancePeriodRequestPeriodIntervalEnum;
}

/**
 * @export
 */
export const BalancePeriodRequestPeriodIntervalEnum = {
    Hour: 'hour',
    Day: 'day',
} as const;
export type BalancePeriodRequestPeriodIntervalEnum =
    (typeof BalancePeriodRequestPeriodIntervalEnum)[keyof typeof BalancePeriodRequestPeriodIntervalEnum];

/**
 * Check if a given object implements the BalancePeriodRequestPeriod interface.
 */
export function instanceOfBalancePeriodRequestPeriod(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'start' in value;
    isInstance = isInstance && 'end' in value;
    isInstance = isInstance && 'interval' in value;

    return isInstance;
}

export function BalancePeriodRequestPeriodFromJSON(json: any): BalancePeriodRequestPeriod {
    return BalancePeriodRequestPeriodFromJSONTyped(json, false);
}

export function BalancePeriodRequestPeriodFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): BalancePeriodRequestPeriod {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        start: json['start'],
        end: json['end'],
        interval: json['interval'],
    };
}

export function BalancePeriodRequestPeriodToJSON(value?: BalancePeriodRequestPeriod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        start: value.start,
        end: value.end,
        interval: value.interval,
    };
}
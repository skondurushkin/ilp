const VOLT_PLURAL_FORMS: PluralForms = ['вольт', 'вольта', 'вольт'];

export function pluralVolt(n: number): string {
    return plural(n, VOLT_PLURAL_FORMS);
}

export type PluralForms = [string, string, string];

export function plural(n: number, forms: PluralForms): string {
    const idx = n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : 2;
    return forms[idx];
}

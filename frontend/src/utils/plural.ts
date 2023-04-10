export function plural(n: number, forms: [string, string, string]): string {
    const idx = n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 1 : 2;
    return forms[idx];
}

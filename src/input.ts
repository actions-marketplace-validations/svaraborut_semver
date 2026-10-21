import * as core from '@actions/core'

function oneOf<T extends string>(name: string, value: string, allowed: readonly T[]): T {
    if (!allowed.includes(value as T))
        throw new Error(`Invalid ${name} value "${value}", expected one of: ${allowed.join(', ')}`)
    return value as T
}

export function getListInput(name: string): string[] {
    return core
        .getInput(name)
        .split(/[\s,]+/)
        .filter(Boolean)
}

export function getEnumInput<T extends string>(name: string, allowed: readonly T[], defaultValue: T): T {
    return oneOf<T>(name, core.getInput(name) || defaultValue, allowed)
}

export function getEnumListInput<T extends string>(name: string, allowed: readonly T[]): T[] {
    return getListInput(name).map(v => oneOf<T>(name, v, allowed))
}

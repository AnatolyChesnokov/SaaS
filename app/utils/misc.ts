import type { ClassValue } from 'clsx'
import type { LoaderData as RootLoaderData } from '#app/root'
import { useFormAction, useNavigation, useRouteLoaderData } from '@remix-run/react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS classnames with support for conditional classes.
 * Widely used for Radix components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Use root-loader data.
 */
function isUser(user: RootLoaderData['data']['user']) {
  return user && typeof user === 'object' && typeof user.id === 'string'
}

export function useOptionalUser() {
  const loaderData = useRouteLoaderData<RootLoaderData>('root')
  if (!loaderData || !isUser(loaderData.data.user)) return undefined
  return loaderData.data.user
}

export function useUser() {
  const optionalUser = useOptionalUser()
  if (!optionalUser) throw new Error('No user found in root loader.')
  return optionalUser
}

/**
 * Permissions.
 * Implementation based on github.com/epicweb-dev/epic-stack
 */
export type RoleName = 'user' | 'admin'

export function userHasRole(
  user: Pick<ReturnType<typeof useUser>, 'roles'> | null,
  role: RoleName,
) {
  if (!user) return false
  return user.roles.some((r: { name: string }) => r.name === role)
}

/**
 * Get the user's image src.
 */
export function getUserImgSrc(imageId?: string | null) {
  return imageId ? `/resources/user-images/${imageId}` : ''
}

/**
 * Use the current route's form action.
 * Checks if the current route's form is being submitted.
 *
 * @default formMethod is POST.
 * @default state is non-idle.
 */
export function useIsPending({
  formAction,
  formMethod = 'POST',
  state = 'non-idle',
}: {
  formAction?: string
  formMethod?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  state?: 'submitting' | 'loading' | 'non-idle'
} = {}) {
  const contextualFormAction = useFormAction()
  const navigation = useNavigation()
  const isPendingState =
    state === 'non-idle' ? navigation.state !== 'idle' : navigation.state === state
  return (
    isPendingState &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod
  )
}

/**
 * Returns a function that calls all of its arguments.
 */
export function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args))
}

/**
 * Returns a function that debounces the given function.
 */
export function debounce<Args extends Array<unknown>, ReturnType>(
  fn: (...args: Args) => ReturnType,
  delay: number,
): (...args: Args) => void {
  let timer: NodeJS.Timeout | null = null

  return (...args: Args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn(...args) // Контекст `this` автоматически сохраняется
    }, delay)
  }
}

/**
 * Performs a deep clone of the given value, supporting various types such as primitives,
 * objects, arrays, Set, Map, Date, and RegExp.
 *
 * @template T - The type of the value to be cloned.
 * @param {T} value - The value to deeply clone.
 * @returns {T} A deep copy of the input value.
 *
 * @example
 * const obj = {
 *   date: new Date(),
 *   set: new Set([1, 2, 3]),
 *   map: new Map([[{ key: 'key1' }, 'value1']]),
 *   regex: /abc/gi,
 *   nested: { a: [1, 2, { b: 3 }] },
 * };
 *
 * const clonedObj = deepClone(obj);
 * console.log(clonedObj); // Deeply cloned object
 * console.log(clonedObj === obj); // false
 * console.log(clonedObj.date instanceof Date); // true
 */
export function deepClone<T>(value: T): T {
  // Примитивы и null
  if (value === null || typeof value !== 'object') {
    return value
  }

  // Дата
  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  // Множества
  if (value instanceof Set) {
    return new Set(Array.from(value, deepClone)) as T
  }

  // Карты
  if (value instanceof Map) {
    return new Map(
      Array.from(value.entries(), ([key, val]) => [deepClone(key), deepClone(val)]),
    ) as T
  }

  // Регулярные выражения
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T
  }

  // Массивы
  if (Array.isArray(value)) {
    return value.map(deepClone) as T
  }

  // Объекты
  const result: Record<string, unknown> = Object.create(Object.getPrototypeOf(value))
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone((value as Record<string, unknown>)[key])
    }
  }

  return result as T
}

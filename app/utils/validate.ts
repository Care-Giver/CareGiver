const ValidateJS = require("validate.js")

// HACK(steve): wierd typescript situation because of strange typings
const Validate: any = ValidateJS.default ? ValidateJS.default : ValidateJS

/**
 * Validates that 1 attribute doesn't appear in another's attributes content.
 */
Validate.validators.excludes = function custom(value, options, key, attributes) {
  const list = attributes[options.attribute] || []
  if (value && list.includes(value)) {
    return options.message || `${value} is in the list`
  }
}

/**
 * Validates that another attribute isn't true.
 */
Validate.validators.tripped = function custom(value, options, key, attributes) {
  if (value && attributes[options.attribute] === true) {
    return options.message || `${options.attribute} is true`
  }
}

/**
 * Defines the rules for validating.
 *
 * Example:
 * ```ts
 * const RULES = {
 *   favoriteBand: {
 *     inclusion: { ['Weezer', 'Other'], message: 'Pick wisely.' }
 *   },
 *   name: {
 *     presence: { message: 'A developer has no name?' }
 *   }
 * }
 * validate(RULES, {})
 * ```
 *
 * See https://validatejs.org/#validators for more examples.
 *
 */
export interface ValidationRules {
  [key: string]: Record<string, unknown>
}

/**
 * An object containing any errors found.
 *
 * Example:
 * ```js
 * {
 *   email: ['Invalid email address.'],
 *   password: [
 *     'Password must be 6 characters.',
 *     'Password must have at least 1 digit.'
 *   ]
 * }
 * ```
 */
export interface ValidationErrors {
  [key: string]: string[]
}

/**
 * Runs the given rules against the data object.
 *
 * @param rules The rules to apply.
 * @param data The object to validate.
 */
export function validate(rules: ValidationRules, data: Record<string, unknown>): ValidationErrors {
  if (typeof data !== "object") {
    return {} as ValidationErrors
  }
  return Validate(data, rules, { fullMessages: false }) || {}
}

/**
 * @description 생년월일 검증
 * `sign-up-screen.tsx` 에서 옮겨옴.
 * 애플이 v1.1.2 심사에서 생년월일을 수집하지 않을 것을 요구 함.
 */
const validateBirthday = (birthday: string) => {
  // 생년월일 검증
  let isValidBirthday = false
  if (birthday.length === 8 + 2) {
    const year = Number(String(birthday).substring(0, 4))
    const month = Number(String(birthday).substring(5, 7)) - 1 //! Date object 에서 month 는 0 부터 시작한다.
    const date = Number(String(birthday).substring(8, 10))

    // 존재 하지 않는 년/월/일 이면 거른다.
    if (!isExists(year, month, date)) {
      return false
    }
    // 미래인 경우, 거른다.
    const birthdayDate = new Date(year, month, date)
    if (isFuture(birthdayDate)) {
      return false
    }
    // 1900.01.01 보다 과거이면 거른다.
    if (isBefore(birthdayDate, new Date(1900, 0, 1))) {
      return false
    }

    // 모든 걸 다 패스하면, null 리턴 ( === 검증 완료)
    isValidBirthday = true
  }
}

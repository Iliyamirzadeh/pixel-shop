const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

export function toEnglishDigits(value) {
  return value
    .replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit))
}
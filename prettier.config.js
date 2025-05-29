/** @type {import('prettier').Config} */
module.exports = {
  semi: true, // 문장 끝에 세미콜론 붙이기
  singleQuote: true, // 작은 따옴표 사용
  printWidth: 100, // 한 줄 최대 길이
  tabWidth: 2, // 탭 간격
  useTabs: false, // 스페이스 사용
  trailingComma: 'all', // 가능한 경우 항상 쉼표 붙이기
  bracketSpacing: true, // 객체 리터럴 중괄호 간 공백 유지
  arrowParens: 'always', // 화살표 함수 괄호 항상 사용 (ex. (x) => x)
  endOfLine: 'lf', // 줄바꿈 문자 방식 (LF로 고정 – cross-platform)
};

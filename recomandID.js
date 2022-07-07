// 추천아이디
/**
 * 조건
 * - 아이디는 3자이상 15자 이하
 * - 아이디는 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.) 만 사용가능
 * - 마침표는 시작과 끝에 사용할 수 없음.
 * input new_id
 * 1단계 new_id의 모든 문자를 소문자 치환
 * 2단계 new_id에 알파벳 소문자, 숫자, 빼기, 마침표를 제외한 모든 문자 제거
 * 3단계 new_id에 마침표가 2번 연속되면 하나로 치환
 * 4단계 new_id에 마침표가 처음과 끝에 나오면 제거
 * 5단계 new_id가 빈 문자열이라면 'a'를 대입
 * 6단계 new_id의 길이가 16자 이상이면 15개를 제외한 모든 문자를 제거
 *      15자의 마지막이 마침표일 경우도 제거
 * 7단계 new_id의 길이가 2자 이하라면 new_id의 마지막 문자를 new_id의 길이가 3이상이 될 때까지 추가
 *
 * 제한사항
 *  - new_id의 길이는 1이상 1000이하
 *  - new_id는 알파벳 대소문자, 숫자, 특수 문자로 구성
 *  - new_id에 나타낼 수 있는 특수문자는 -_.~!@#$%^&*()=+[{]}:?,<>/ 로 한정
 *
 * 정규식은 자주 사용안해서 기본적인 것을 찾아보며 진행
 * 시작, 끝문자를 위한 메타 ^$ 처리 및 empty를 체트하기 위한 ^$ 처리 등 기본적인 정규식을 많이 배움
 */

//특수문자
const RESTRICT_ALLOW_CHAR = /[^a-z0-9-_.]/g;
const RESTRICT_REPEAT_FULL_STOP = /\.+/g; // 마침표 1개이상 추출
const RESTRICT_START_FULL_STOP = /^\./; // 시작 마침표
const RESTRICT_END_FULL_STOP = /\.$/; //  끝 마침표
const RESTRICT_EMPTY = /^$/;
function solution(req_id) {
  let answer = req_id;
  answer = answer
    .toLowerCase()
    .replace(RESTRICT_ALLOW_CHAR, "")
    .replace(RESTRICT_REPEAT_FULL_STOP, ".")
    .replace(RESTRICT_START_FULL_STOP, "")
    .substring(0, 15)
    .replace(RESTRICT_END_FULL_STOP, "")
    .replace(RESTRICT_EMPTY, "a");

  return answer.padEnd(3, answer.charAt(answer.length - 1));
}

console.log(solution("abcdefghijklmn.p"));

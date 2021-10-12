/**
 * 배열에 최대, 최소, 중간값 찾기
 * 예시
 * 제약 : for문과 if, else문만 사용
 * arr =[1, 2, 3, 4, 5];
 * 제일 큰 값은 5,
 * 제일 작은 값은 1,
 * 중간은 3
 */

const arr = [];
let len = 21;
while (len > 0) {
  const value = Math.floor(Math.random() * 101);
  arr.includes(value) || arr.push(value);
  len--;
}
// 정렬의 원리
// 이전 값을 기억
// 순서를 변경
len = arr.length;
for (let i = 0; i < len; i++) {
  for (let j = i + 1; j < len; j++) {
    const value = arr[j];
    /**
       arr[i]는 계속 참조가 변경되야 하므로
       특정 변수로 만들지 않음.
     */
    if (arr[i] > value) {
      // 배열에 참조를 서로 교환
      arr[j] = arr[i];
      arr[i] = value;
    }
  }
}

// 홀수, 짝수에 따른 중간 인덱스 접근 설정
const centerIndex = len % 2 == 0 ? len / 2 : Math.ceil(len / 2);
const min = arr[0];
const max = arr[len - 1];
const center = arr[centerIndex - 1];
console.log(arr, len);
console.log(`min:${min},  max:${max}, center:${center}`);

/**
 * 주어진 숫자를 이용해 만들 수 있는 4자리 자연수의 숫자 반환
 *
 * 만들 수 있는 총 개수는
 * 제공 숫자 그룹에 k승에서 숫자 그룹 중 k번 제공되지 않는 그룹의 수
 *
 * ex )
 * numbers = [1, 1, 1], [2, 2, 2] [3,3,3,3]
 * k       = 4
 * 3개의 숫자를 이용해 4자리 숫자를 조합할 때 경우의 수
 * 3 * 3 * 3 * 3 = 81 - 2( 1, 2는 세 개를 제공해서 4번 나올 수 없음.)
 *
 * 미리 그룹을 찾고 조합을 하면서 원하는 수에 카운트가 되면 종료하면 될까?
 *
 * 조합일 경우는 소팅하고 루핑반복하면 됨.
 */

function solution(numbers, k) {
  /**
   * 주어진 배열을 이용해 조합할 수 있는 숫자의 수를 반환.
   * 숫자는 중복이 되어도 상관없음.
   *
   * 조합의 경우 생각해 보기
   * 1
   * 1, 1,
   *    1, -> 1, 1 -> 1, 1, 2 -> 1, 1, 2, 2
   * 1, 1, 1
   *       1 -> 1, 2 ->, 1, 2, 2 -> 1, 2, 2, 2
   * 1, 1, 1, 2
   *          2 -> 2, 2 -> 2, 2, 2 -> 2, 2, 2, 3
   *
   * 초기 시작인덱스 부터 k번째 까지는 하위 모든 경우를 조합할 수 있지만
   * k번째 이후는 0~k에 해당하는 원소는 조합에 포함되지 않는 문제가 발생.
   *
   * 해결을 위해서는 분류를 한 후 경우에 값을 구하고 모두 더한다. <- 이게 정석적인 방법!
   * 하지만 컴퓨터라면 그런 것을 무시하고 그냥 모두 만들어 가면 어떻게 될까?
   *
   * 시작값이 k보다 클 경우는 앞에서 부터 조합.
   * 시작을 k부터 하면 좌,우 진행이 모두 가능하다.
   */

  // 현재 좌우 값이 있고 문자열 길이를 판단해 재귀를 할지 말지를 결정
  const map = {};
  const max = numbers.length;
  let completeCount = 0;
  function search(list) {
    if (list.length === k) {
      completeCount++;
      const a = list.reduce((c, v) => {
        c += numbers[v].toString();
        return c;
      }, "");
      map[a] = a;
      return;
    }
    for (let i = 0; i < max; i++) {
      if (list[i] !== i && counters[numbers[i]]) {
        list.push(i);
        counters[numbers[i]] -= 1;
        search(list);
        list.pop();
        counters[numbers[i]] += 1;
      }
    }
  }
  // 재귀가 어렵다..
  // 모든 것을 한번에 재귀로 처리하고 싶다.
  /**
   * 자가 분열처럼 모든 배열을 순회하며 조합할 수 있을까?
   * - 시작부터 하나씩 더해가며 조합 (여기까지는 쉬움.)
   * - 시작 위치가 k보다 커지면 지나간 인덱스도 조합에 대상이 될 수 있음.
   * - 조합에 기본은 고정된 값은 목록에서 제거되야 한다.
   * - 같은 수에 그룹을 만들고 고정된 그룹과 나머지를 조합한다.
   *
   * 중복은 목록에서 제거.
   */
  let counters = numbers.reduce((c, v) => {
    if (!c[v.toString()]) {
      c[v.toString()] = 0;
    }
    c[v.toString()]++;
    return c;
  }, {});

  let stack = [];
  for (let i = 0; i <= numbers.length - k; i++) {
    stack.push(i);
    counters[numbers[i]] -= 1;
    search(stack);
    stack.pop();
    counters[numbers[i]] += 1;
  }
}
solution([1, 1, 1, 2, 2, 2, 3, 3, 3, 3], 4);

/**
 * 길이 제한이 있고 두 개의 배열을 조합하는 경우
 * k = 4일 경우
 * [1, 1, 2]
 * 고정 1개일 경우 rest = k-1,
 * 고정 2개일 경우 rest = k-2,
 * 고정 3개일 경우 rest = k-3,
 * [2, 3, 4]
 *
 * 길이 제한이 있고 여러 배열을 대상으로 조합하는 경우, 중복은 허용하지만 빼는 것은 안됨.
 * k = 4일 경우
 * [1, 2, 4]
 * 고정 1개일 경우 rest = k-1을 다시 두 개의 배열 조합과 같이 계산해야 함.
 * 1이 고정으로 되고
 * [2,2,2]에서 1를 사용할 경우 rest에 -1을 처리 하고 다음으로
 * 1과 2가 고정으로 되고 나머지를 채움.
 *
 * 방향성이 같아야 함. 좌우 이동 이 동시에 일어나면 재귀안에서 특정 인덱스를 앞뒤로 이동만 할 수 있음.
 * 중앙에서 좌우로 하나씩 증가 시키지만
 * 인덱스 - 1 >= 3 경우 좌측 시작 추가
 * max - (인덱스 + 1) >= 3 우측 시작 추가
 */

/**
 * 주어진 배열 numbers를 이용해 만들 수 있는 k자리의 수의 조합을 반환
 * 동일 숫자를 사용할 수 있으므로 include로는 판단할 수 없음.
 * 사용할 수 있는 재료를 count하면 어떨까?
 * @param {*} numbers
 * @param {*} k
 */
function solutionBruteForce(numbers, k) {
  const counters = numbers.reduce((c, v) => {
    if (!c[v]) {
      c[v] = 0;
    }
    c[v]++;
    return c;
  }, {});

  /**
   * pick하고 줄도 세운다.
   * pick된 숫자는 체크하고 줄도 세우기 위해 재료에 앞에서 부터 체크해야 된다.
   * 이미 pick된 요소는 제거한다.
   * 루프 처리를 어떻게 하는게 좋을 것인가.
   */
  const map = {};
  let callCount = 0;
  const compose = current => {
    if (current.length === k) {
      if (!map[current]) {
        callCount++;
        map[current] = current;
      }
      return;
    }
    //repeat
    const end = numbers.length - current.length;
    for (let i = 0; i < end; i++) {
      const key = numbers[i];
      if (counters[key] <= 0) continue;
      counters[key] -= 1;
      compose(current + key.toString());
      counters[key] += 1;
    }
  };
  compose("");
  console.log("call", callCount, "keys", Object.keys(map).length);
}

solutionBruteForce([1, 1, 1, 2, 2, 2, 3, 3, 3, 3], 4);

/**
 * n개의 정수로 이루어진 inputs이 주어지면 4개의 원소로 이루어진 유니크한 배열을 만들어 반환
 * 조건
 *  0<= a, b, c d < n
 *  a, b, c, d는 서로 달라야 함.
 *  a + b + c + d 는 taget과 같아야 함.
 *
 *  반환하는 배열의 순서는 상관없음
 *
 * 3자리는 하나를 고정하면 left, right를 통한 조합이 완벽한데
 * 하나가 추가될 경우는 어떻게 해야 할까?
 * 재귀를 반복해야 하나?
 * 포인터를 3개를 만들어 관리할 수 있나?
 */

/**
 * 두 개의 숫자 합을 통해 target과 같은 값 찾기
 * 결과값에 같은 조합이 중복되는 것을 제거
 * @param {*} nums
 * @param {*} target
 * @param {*} start
 * @returns
 */
function twoSum(nums, target, start) {
  const len = nums.length;
  let l = start;
  let r = len - 1;
  const res = {};
  while (l < r) {
    const a = nums[l];
    const b = nums[r];
    const sum = a + b;
    if (sum > target) {
      r--;
    } else if (sum < target) {
      l++;
    } else {
      res[a + "," + b] = [a, b];
      while (r < len - 1 && nums[r] === nums[r - 1]) r--;
      while (l > start && nums[l] === nums[l - 1]) l++;
      l++;
      r--;
    }
  }
  return Object.values(res);
}

function kSum(nums, target, start, k) {
  const len = nums.length;
  const res = [];
  if (len === start) {
    return res;
  }

  // 조합을 할수 없는 target값인 경우 res반환
  if (nums[start] * k > target || nums[len - 1] * k < target) {
    return res;
  }

  if (k === 2) {
    return twoSum(nums, target, start);
  }

  for (let i = start; i < len; i++) {
    // 배열 앞뒤로 중복되는 값은 제외 후 재귀 호출
    if (i === start || nums[i - 1] !== nums[i]) {
      // target - i 를 만족하는 배열을 구한 배열에 i를 추가한 후 결과에 추가
      const o = kSum(nums, target - nums[i], i + 1, k - 1);
      o.map(v => {
        v.push(nums[i]);
        res.push(v);
      });
    }
  }
  return res;
}

function solutionRecursive(nums, target) {
  const len = nums.length;
  if (len < 4) return [];
  nums = nums.sort((a, b) => a - b);
  console.log("input", nums, "target", target);
  const o = kSum(nums, target, 0, 4);
  console.log("o", o);
}

/**
 * 기존 three-sum의 응용
 * 조합하는 숫자가 늘어나면 재귀를 통한 접근이 필요.
 * @param {*} nums
 * @param {*} target
 * @returns
 */
function solution(nums, target) {
  const len = nums.length;
  if (len < 4) return [];
  nums = nums.sort((a, b) => a - b);
  const store = {};
  for (let i = 0; i < len - 3; i++) {
    const a = nums[i];

    for (let j = i + 1; j < len - 2; j++) {
      const b = nums[j];
      let l = j + 1;
      let r = len - 1;
      while (l < r) {
        const c = nums[l];
        const d = nums[r];
        const sum = a + b + c + d;
        if (sum === target) {
          store[(a + ",", +b + "," + c + "," + d)] = [a, b, c, d];
          while (nums[l] === nums[l + 1]) l++;
          while (nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum > target) {
          r--;
        } else {
          l++;
        }
      }
    }
  }

  const o = [];
  console.log("o", Object.values(store));
  return o;
}
//nums [ -2, -1, 0, 0, 1, 2 ]
// solution([1, 0, -1, 0, -2, 2], 0);
// solution([2, 2, 2, 2, 2], 8);
// 2자리를 고정하고 답을 찾아야 한다.
// 2자리를 고정하는 방법은?
// 4자리가 되니 조건에 맞을 경우에도 자리 수를 유지하고 다음 경우의 수를 체크해야 하는 상황이 발생..
//
// solution([-3, -1, 0, 2, 4, 5], 0);
// solution([1, -2, -5, -4, -3, 3, 3, 5], -11);

// solutionRecursive([1, -2, -5, -4, -3, 3, 3, 5], -11);
// solutionRecursive([-3, -1, 0, 2, 4, 5], 0);
//solutionRecursive([1, 0, -1, 0, -2, 2], 0);
solutionRecursive([-2, -1, -1, 1, 1, 2, 2], 0);
//[[-2,-1,1,2],[-1,-1,1,1]]

/**
 * 코딩 테스트 공부
요구사항
 주어진 모든 문제들을 풀 수 있는 알고력과 코딩력을 얻는 최단시간을 구하려 합니다.
 모든 문제들을 1번 이상씩 풀 필요는 없습니다.

 풀 수 없는 문제를 해결하기 위해서는 알고력과 코딩력을 높여야 합니다. 
 알고력과 코딩력을 높이기 위한 다음과 같은 방법들이 있습니다.
 
 알고력을 높이기 위해 알고리즘 공부를 합니다. 
 - 알고력 1을 높이기 위해서 1의 시간이 필요합니다.
 코딩력을 높이기 위해 코딩 공부를 합니다. 
 - 코딩력 1을 높이기 위해서 1의 시간이 필요합니다.
현재 풀 수 있는 문제 중 하나를 풀어 알고력과 코딩력을 높입니다. 
각 문제마다 문제를 풀면 올라가는 알고력과 코딩력이 정해져 있습니다.
문제를 하나 푸는 데는 문제가 요구하는 시간이 필요하며 같은 문제를 여러 번 푸는 것이 가능합니다.

현재 능력치에서 가장 효율적인 방법으로 레벨업을 해 모든 문제를 풀수 있는 방법을 찾는 문제..


제한사항
    초기의 알고력을 나타내는 alp와 초기의 코딩력을 나타내는 cop가 입력으로 주어집니다.
    0 ≤ alp,cop ≤ 150
    1 ≤ problems의 길이 ≤ 100
    problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]의 형태로 이루어져 있습니다.
    alp_req는 문제를 푸는데 필요한 알고력입니다.
    0 ≤ alp_req ≤ 150
    cop_req는 문제를 푸는데 필요한 코딩력입니다.
    0 ≤ cop_req ≤ 150
    alp_rwd는 문제를 풀었을 때 증가하는 알고력입니다.
    0 ≤ alp_rwd ≤ 30
    cop_rwd는 문제를 풀었을 때 증가하는 코딩력입니다.
    0 ≤ cop_rwd ≤ 30
    cost는 문제를 푸는데 드는 시간입니다.
    1 ≤ cost ≤ 100
    
    정확성 테스트 케이스 제한사항

    0 ≤ alp,cop ≤ 20
    1 ≤ problems의 길이 ≤ 6
    0 ≤ alp_req,cop_req ≤ 20
    0 ≤ alp_rwd,cop_rwd ≤ 5
    1 ≤ cost ≤ 10
    효율성 테스트 케이스 제한사항

    주어진 조건 외 추가 제한사항 없습니다

입출력 예
alp	cop	problems	                                        result
10	10	[[10,15,2,1,2],[20,20,3,3,4]]	                    15
0	0	[[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]	  13

- 1번 문제를 2번 풉니다. 알고력 4, 코딩력 2가 되며 시간이 4만큼 소요됩니다.
- 코딩력 3을 늘립니다. 알고력 4, 코딩력 5가 되며 시간이 3만큼 소요됩니다.
- 2번 문제를 2번 풉니다. 알고력 10, 코딩력 7이 되며 시간이 4만큼 소요됩니다.
- 4번 문제를 1번 풉니다. 알고력 10, 코딩력 11이 되며 시간이 2만큼 소요됩니다. 
- 13의 시간을 소요하여 모든 문제를 풀 수 있는 알고력과 코딩력을 가질 수 있습니다.

모든 문제들을 1번 이상씩 풀 필요는 없습니다. 

가장 어려운 문제를 풀 수 있는 능력을 가장 효율적으로 쌓는 방법찾기

- 달성 수치확인 ?
- 현재 능력에서 가장 효율좋게 능력을 올릴 수 있는 문제 찾기 ?

*/

/**
 * 현재 능력에서 보상을 가장 효율적으로 얻을 수 있는 문제 찾기
 * @param {*} ability : 현재 능력
 * @param {*} group   : 남음 문제
 */
//const store = [];
function getNext(current, group) {
  const len = group.length;
  let recommand_problem = undefined;
  let current_count = Number.MAX_SAFE_INTEGER;
  const [alp_current, cop_current, alp_rwd, cop_rwd, cost] = current;
  for (let i = 0; i < len; i++) {
    const [alp_req, cop_req] = group[i];
    // 현재 문제는 스킵
    if (alp_req <= alp_current && cop_req <= cop_current) continue;
    const diff_alp = alp_req - alp_current;
    const diff_cop = cop_req - cop_current;
    if (diff_alp >= 0 || diff_cop >= 0) {
      const alp_gap = Math.ceil(diff_alp / alp_rwd);
      const cop_gap = Math.ceil(diff_cop / cop_rwd);

      let req_count = Math.min(alp_gap, cop_gap);
      if (req_count <= 0) {
        req_count = Math.max(alp_gap, cop_gap);
      }
      //const req_cost = Math.min(alp_gap, cop_gap) * cost;
      console.log("req_count", req_count);
      if (current_count > req_count) {
        current_count = req_count;
        console.log("req_count", req_count);
        recommand_problem = [...group[i]];
      }
    }
  }
  return [recommand_problem, current_count];
}

function available(alp, cop, problems) {
  const arr = problems
    .filter(([alp_req, cop_req]) => {
      return alp_req <= alp && cop_req <= cop;
    })
    .flatMap(x => x);
  return arr.length ? arr : problems[0];
}

/**
 * 현재 목표와 다음 목표가 있어야 한다.
 * @param {*} alp
 * @param {*} cop
 * @param {*} problems
 * @returns
 */
function solution2(alp, cop, problems) {
  // 필요 능력치 별로 문제 정렬
  problems.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

  let max_alp = -1;
  let max_cop = -1;

  problems.forEach(([c_alp, c_cop]) => {
    if (c_alp > max_alp) {
      max_alp = c_alp;
    }
    if (c_cop > max_cop) {
      max_cop = c_cop;
    }
  });

  let time = 0;
  // 문제추출
  const store = [];
  let my_alp = alp;
  let my_cop = cop;

  //현재 도전 과제를 찾은 후 한번 실행
  let current = problems[0];

  while (my_alp !== current[0] || my_cop !== current[1]) {
    if (my_alp !== current[0]) {
      my_alp++;
    } else if (my_cop !== current[1]) {
      my_cop++;
    }
    time++;
  }

  let [next, count] = getNext(current, problems);
  //console.log("시작", current, "time", time, "다음", next, count);

  while (next && my_alp <= max_alp && my_cop <= max_cop) {
    if (count) {
      my_alp += current[2] * count;
      my_cop += current[3] * count;
      time += current[4] * count;
      count = 0;
    } else if (my_alp < next[0]) {
      my_alp++;
      time++;
    } else if (my_cop < next[1]) {
      my_cop++;
      time++;
    } else if (my_alp >= next[0] && my_cop >= next[1]) {
      current = [...next];
      [next, count] = getNext(
        [my_alp, my_cop, current[2], current[3], current[4]],
        problems
      );
    }
  }
  console.log("최종 시간", time, "능력", my_alp, my_cop);
  return time;
}

// solution2(10, 10, [
//   [10, 15, 2, 1, 2],
//   [20, 20, 3, 3, 4]
// ]);

// solution2(0, 0, [
//   [0, 0, 2, 1, 2],
//   [4, 5, 3, 1, 2],
//   [4, 11, 4, 0, 2],
//   [10, 4, 0, 4, 2]
// ]);

// solution2(0, 0, [
//   [0, 0, 2, 1, 2],
//   [4, 5, 3, 1, 2],
//   [4, 11, 4, 0, 2],
//   [10, 4, 1, 4, 4]
// ]);

// function gcd(a, b) {
//   if (a % b === 0) {
//     return b;
//   }
//   return gcd(b, a % b);
// }

/**
 * 능력치를 올리는 최단시간을 구하는 문제
 * 방법은?
 *  1. 주어진 문제를 소팅.
 *  2. 현재 능력을 기준으로 가능문제와 다음문제를 추출
 *  3. 다음문제 도전을 위한 소요시간을 현재도전 가능문제의 보상을 통해 추출
 *  4. 추출한 시간을 통해 능력치가 도달하면 이를 반복.
 */
function nextTime(current, problems, time, max) {
  const [alp, cop, alp_rwd, cop_rwd, cost] = current;

  let select_info = {
    cost: Number.MAX_SAFE_INTEGER,
    problem: undefined,
    alp: undefined,
    cop: undefined,
    time: time
  };
  if (alp + cop >= max) return time;
  for (let i = 0; i < problems.length; i++) {
    const [alp_req, cop_req] = problems[i];
    // 둘중 하나라도 큰 값이 있을 경우 처리
    if (alp < alp_req || cop_req > cop) {
      const alp_gap = alp_req - alp;
      const cop_gap = cop_req - cop;
      const alp_count = Math.ceil(alp_gap / alp_rwd);
      const cop_count = Math.ceil(cop_gap / cop_rwd);

      const max_cost = ((alp_count + cop_count) / 2) * cost;

      if (select_info.cost > max_cost) {
        select_info.cost = max_cost; // 목표 능력치 중 달성하기 쉬운 목표 도달 시간
        select_info.problem = problems[i];
        let min_count = Math.min(alp_count, cop_count);
        if (min_count < 0) {
          min_count = Math.max(alp_count, cop_count);
        }
        const rwd_gap = Math.abs(alp_count - cop_count);
        const cost_gap = rwd_gap * cost;
        //cost_gap = Math.abs(alp_cost - cop_cost); // 모든 능력치 목표 도달에 필요한 추가 시간(알고력, 코딩력)
        //rwd_gap = select_info.cost_gap / cost; // 기본 능력치 상승을 통한 목표 능력치 도달 필요 시간

        // 기본 능력치 상승에 사용할 값 추출, 추출값이 0보다 작을 경우는 큰 값을 사용
        select_info.alp = alp + alp_rwd * min_count;
        select_info.cop = cop + cop_rwd * min_count;
        select_info.time += cost * min_count;

        if (rwd_gap && rwd_gap < cost_gap) {
          if (select_info.alp < alp_req) {
            select_info.alp += alp_rwd * rwd_gap;
            select_info.time += 1 * rwd_gap;
          } else if (select_info.cop < cop_req) {
            select_info.cop += cop_rwd * rwd_gap;
            select_info.time += 1 * rwd_gap;
          }
        }
      }
    }
  }

  return nextTime(
    [
      select_info.alp,
      select_info.cop,
      select_info.problem[2],
      select_info.problem[3],
      select_info.problem[4]
    ],
    problems,
    select_info.time,
    max
  );
}

function solutionLoop(alp, cop, problems) {
  // 요구 능력치를 기준으로 정렬
  problems.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

  let max_alp = 0;
  let max_cop = 0;
  problems.forEach(current => {
    max_alp = Math.max(current[0], max_alp);
    max_cop = Math.max(current[1], max_cop);
  });

  let time = 0;

  // 문제 추출
  let current = problems[0];
  // 초기 능력치 부족 처리
  if (alp < current[0]) {
    const diff_alp = current[0] - alp;
    alp += diff_alp;
    time += diff_alp;
  }
  if (cop < current[1]) {
    const diff_cop = current[1] - cop;
    cop += diff_cop;
    time += diff_cop;
  }

  const totalTime = nextTime(
    [alp, cop, current[2], current[3], current[4]],
    problems,
    time,
    max_alp + max_cop
  );
  console.log("totalTime", totalTime);
}

solutionLoop(0, 0, [
  [0, 0, 2, 1, 2],
  [4, 5, 3, 1, 2],
  [4, 11, 4, 0, 2],
  [10, 4, 0, 4, 2]
]);

solutionLoop(10, 10, [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4]
]);

// 신고결과 받기
/**
 * - 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
 *  - 신고 횟수는 제한이 없음. 서로 다른 유저를 계속 신고 가능
 *  - 한 유저를 여러번 신고 가능하지만 카운트는 1회로 처리
 * - k번 이상 신고된 유저는 게시판 이용이 정지,  해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송
 *  - 유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송
 *
 * 제한사항
 * 2<=id_list<=1000
 *  아이디는 1<=id_list<=10
 *  id_list의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 구성
 *  id_list에는 같은 아이디가 중복해서 들어있지 않음
 *
 * 1<=report<=200000
 *  3<=report<=21
 *  report의 원소는 이용자id 신고한 id의 형태의 문자열
 *  예를 들어 muzi frodo의 경우 muzi가 frodo를 신고했다는 의미
 *  이용자id와 신고한id는 공백(스페이스)하나로 구분
 *  자기자신을 신고하는 경우는 없음
 * 1<=k<=200 k는 자연수
 *  return 배열은 id_list에 담긴 id순서대로 각 유저가 받을 결가 메일 수를 담으면 됨.
 */

const _users = ["muzi", "frodo", "apeach", "neo"];
const _k = 2;
const _report = [
  "muzi frodo",
  "apeach frodo",
  "frodo neo",
  "muzi neo",
  "apeach muzi"
];

/**
 * 결국 유저별 신고자목록 정지된 목록이 나와야 결과를 리턴하기 좋음.
 * 유저별 정보를 어떻게 관리할까 객체? 배열?
 * Set을 이용한 중복제거를 이용하면 indexOf코드 제거 가능
 * @param {} users
 * @param {*} k
 * @param {*} report
 * @returns
 */
function solution(users, k, report) {
  let answer = [];
  const userInfoMap = {};
  const banUsers = [];
  const uniqReport = [...new Set(report)]; // 중복제거
  users.forEach(user => {
    userInfoMap[user] = { report_users: [], reported_count: 0, ban_users: [] };
  });

  console.log("uniqReport", uniqReport);
  // 신고정보를 userInfo에 정리
  uniqReport.forEach(info => {
    const [reporter, reported] = info.split(" ");
    const reportUser = userInfoMap[reporter];
    const reporedtUser = userInfoMap[reported];
    //신고자 목록에 없으면 추가
    if (reportUser.report_users.indexOf(reported) == -1) {
      reportUser.report_users.push(reported);
      // 신고당한 횟수 증가
      reporedtUser.reported_count++;
    }
    // 신고횟수가 기준 이상이면 ban목록에 추가
    if (reporedtUser.reported_count >= k) {
      if (banUsers.indexOf(reported) == -1) {
        banUsers.push(reported);
      }
    }
  });

  //
  // 유저가 신고한 목록 중 밴 당한 유저를 추출
  Object.values(userInfoMap).forEach(user => {
    user.report_users.forEach(v => {
      if (banUsers.indexOf(v) > -1) {
        user.ban_users.push(v);
      }
    });
    // ban_users목록 길이 == 유저별 결과 메일 횟수
    answer.push(user.ban_users.length);
  });

  return answer;
}

console.log(solution(_users, _k, _report));
console.log(
  solution(["con", "ryan"], 3, ["ryan con", "ryan con", "ryan con", "ryan con"])
);

//console.log([...new Set(["ryan con", "ryan con", "ryan con", "ryan con"])]);

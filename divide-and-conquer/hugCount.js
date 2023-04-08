/**
 * 팬미팅 현장에 가수와 팬이 서로 성별이 다를 경우 허그를 할 수 있다.
 * 팬은 맨 오른쪽 멤버에서부터 시작해 한 명씩 왼쪽으로 움직이며 멤버들과 하나씩 포옹을 합니다.
 * 모든 팬들이 동시에 한 명씩 움직입니다.
 * 하지만 하이퍼시니어의 남성 멤버들이 남성 팬과 포옹하기가 민만하다고 여겨서, 남성 팬과는 포옹 대신 악수를 하기로 했습니다.
 * 줄을 선 멤버들과 팬들의 성별이 각각 주어질 때 팬 미팅이 진행되는 과정에서 하이퍼시니어의 모든 멤버가 동시에 포옹을 하는 일이 몇 번이나 있는지
 * 계산하는 프로그램을 작성하시오.
 *
 *
 * 입력 
 * 각 테스트 케이스는 멤버들의 성별과 팬들의 성별을 각각 나타내는 두 줄의 문자열로 구성.
 * 각 문자열은 왼쪽부터 오른족 순서대로 각 사람들의 성별입니다.
 * M은 해당하는 사람이 남자, F는 해당하는 사람이 여자임을 나타냅니다.
 * 
 * 멤버와 팬의 수는 1<x<200,000 이하의 정수, 멤버의 수는 항상 팬의 수 이하.

 *ex)
 * 가수  : fffmmm
 * 팬   :  mmmfff
 * out  : 1
 */

/**
 * 모두 허그하는 케이스를 구분하기 쉽게 하기 위해 성별을 문자에서 숫자(0,1)로 변경
 * 해당 자리의 팬과 멤버를 더 한 후 모두 곱한 결과가 1이면 허그를 한 경우에 해당.
 * @param {*} members
 * @param {*} fans
 */
function solution(members, fans) {
  // 멤버 성별에 따른 숫자 변경
  const digitMemebers = [];
  for (let i = 0; i < members.length; i++) {
    digitMemebers.push(members[i] === "f" ? 0 : 1);
  }
  //팬 성별에 따른 숫자 변경
  const digitFans = [];
  for (let i = 0; i < fans.length; i++) {
    digitFans.push(fans[i] === "f" ? 0 : 1);
  }

  let hugCount = 0;
  // 팬 들을 이동하며 허그 여부 판단.
  for (let i = 0; i <= digitFans.length - digitMemebers.length; i++) {
    let allHug = true;
    for (let j = 0; j < digitMemebers.length; j++) {
      // 합의 결과가 1보다 작으면 실패
      if (digitMemebers[j] + digitFans[i + j] < 1) {
        allHug = false;
        break;
      }
    }
    if (allHug) {
      hugCount += 1;
    }
  }
  console.log("digitMembers", digitMemebers);
  console.log("digitFans", digitFans);
  console.log("hugCount", hugCount);
}

solution("fffmmm", "mmmfff");
solution("fffff", "ffffffffff");
solution("ffffm", "fffffmmmmf");

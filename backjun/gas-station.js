/**
 * 주유소
 *
 * 어떤 나라에 N개의 도시가 있다.
 * 이 도시들은 일직선 도로 위에 있다. 편의상 일직선을 수평 방향으로 두자.
 * 제일 왼쪽의 도시에서 제일 오른쪽의 도시로 자동차를 이용하여 이동하려고 한다.
 * 인접한 두 도시 사이의 도로들은 서로 길이가 다를 수 있다. 도로 길이의 단위는 km를 사용한다.
 * 처음 출발할 때 자동차에는 기름이 없어서 주유소에서 기름을 넣고 출발하여야 한다.
 * 기름통의 크기는 무제한이어서 얼마든지 많은 기름을 넣을 수 있다.
 * 도로를 이용하여 이동할 때 1km마다 1리터의 기름을 사용한다.
 * 각 도시에는 단 하나의 주유소가 있으며, 도시 마다 주유소의 리터당 가격은 다를 수 있다. 가격의 단위는 원을 사용한다.
 * 예를 들어, 이 나라에 다음 그림처럼 4개의 도시가 있다고 하자.
 *     ⌜2⌝    ⌜3⌝    ⌜1⌝
 *  5 ---- 2 ---- 4 ---- 1
 *
 * 원 안에 있는 숫자는 그 도시에 있는 주유소의 리터당 가격이다.
 * 도로 위에 있는 숫자는 도로의 길이를 표시한 것이다.
 *
 * 각 도시에 있는 주유소의 기름 가격과, 각 도시를 연결하는 도로의 길이를 입력으로 받아 제일 왼쪽 도시에서 제일 오른쪽 도시로 이동하는 최소의 비용을 계산하는 프로그램을 작성.
 *
 * ex)
 * 제일 왼쪽 도시에서 6리터의 기름을 넣고, 더 이상의 주유 없이 제일 오른쪽 도시까지 이동하면 총 비용은 30원.
 * 제일 왼쪽 도시에서 2리터의 기름을 넣고(2×5 = 10원) 다음 번 도시까지 이동한 후 3리터의 기름을 넣고(3×2 = 6원) 다음 도시에서 1리터의 기름을 넣어(1×4 = 4원) 제일 오른쪽 도시로 이동하면, 총 비용은 20원
 * 제일 왼쪽 도시에서 2리터의 기름을 넣고(2×5 = 10원) 다음 번 도시까지 이동한 후 4리터의 기름을 넣고(4×2 = 8원) 제일 오른쪽 도시까지 이동하면, 총 비용은 18원
 *
 */

//이동하며 가격정보를 파익하는 순간 가장 싼 가격을 기억해 사용하면 된다.
function solution(priceList, distance) {
  //구간별 정보를 미리 구성하는게 객체로 구성할까?
  let price = Number.MAX_SAFE_INTEGER;
  let sum = 0;
  for (let i = 0; i < distance.length; i++) {
    price = Math.min(price, priceList[i]);
    sum += distance[i] * price;
  }
  return sum;
}

[
  {
    distance: [2, 3, 1],
    price: [5, 2, 4, 1],
  },
  {
    distance: [3, 3, 4],
    price: [1, 1, 1, 1],
  },
].forEach(({ distance, price }) => {
  console.log(solution(price, distance));
});
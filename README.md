# algorithm

생각 날때마다 틈틈히 풀어보는 알고리즘 문제

- 조건에 따른 숫자 변경( password.js )
- for, if,else를 이용한 배열정렬 후 최소, 최대, 중간값 찾기( minmaxcenter.js )
- 배열정렬하기( numberberSort.js)
- 랜덤한 숫자 맞추기( up&down게임 ) - up&down.html
- 베스킨라빈스31 게임( 무조건 지는 게임 ) - baskinrabbins.html
- 보이는 막대기 개수 구하기( stick.js )

  - 높이만 다르고( 같은 높이의 막대기가 있을 수 있음)모양이 같은 막대기를 일렬로 세운 후, 왼쪽부터 차례로 번호를 붙인다.

  - 각 막대기의 높이는 그림에서 보인 것처럼 순서대로 <code>6,9,7,6,4,6</code>이다.
    ![샘플이미지](./images/stick.png)
  - N개의 막대기에 대한 높이 정보가 주어질 때, 오른쪽에서 보아서 몇 개가 보이는지를 알아내는 프로그램을 작성.

- n을 m 이하의 자연수로만 나타내는 방법(분할수 - partionNumber.js )
  ![수 분할 성질](./images/partion_number.png)
  ![수 분할 성질2](./images/partion_number2.png)

  - (1)의 자연수 n을 한 덩어리로 만드는 방법은 당연히 1개,
  - (2)의 자연수 n을 n개의 무더기로 만드는 방법 역시 1개
    - ex) 5 = [1, 1, 1, 1, 1]
  - (3)의 P(n)은 n의 분할 수라고 하며, n을 분할하는 모든 경우의 수를 나타냄.
  - (4)의식은 P(n, k)를 두 가지 경우로 나눈 것.
    ![수 분할 성질설명1](./images/partion_number3.png)
    ![수 분할 성질설명2](./images/partion_number4.png)

        > 즉 P(n, k)를
        > ⓵ 1로 이루어진 무더기가 존재하는 경우 P( n-1, k-1 )
        > ⓶ 1로 이루어진 무더기가 없는 경우 P( n-k, k )
        > 이렇게 두 가지 경우로 나누어서 구한다는 의미

  ![수 분할 공식](./images/partion_number5.png)

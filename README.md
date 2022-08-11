# FastLane Assignment

패스트레인 프론트엔드 과제입니다.

> 개발자 : 이다슬 <br>
> 개발 기간 : 8/8 - 8/11 <br>
> 배포 링크 : https://fastlane-assignment.netlify.app/

# 사용 기술스택 / 라이브러리

- TypeScript, React(CRA)
- Styled Component
- React-router v6 (페이지 전환)
- Recoil (전역 상태 관리)
- Eslint + Prettier
- [React-markdown](https://github.com/remarkjs/react-markdown) (디테일 페이지 내용 마크다운 처리)
- [React-loading](https://github.com/fakiolinho/react-loading) (loading spinner)

# 실행 방법

1. Repository clone

```
git clone https://github.com/daseuls/fastlane_assignment.git
```

2. 해당 프로젝트 폴더 이동

```
cd fastlane-assignment
```

3. 필요 package 설치

```
npm install
```

4. root 하단에 .env 파일 생성 후 환경 변수 등록

```
// .env

REACT_APP_BASE_URL=https://api.github.com/repos/facebook/create-react-app/issues
```

4. 프로젝트 실행

```
npm start
```

# 구현 사항

## 이슈 메인 페이지

<img width="1000" alt="스크린샷 2022-08-11 오전 8 28 53" src="https://user-images.githubusercontent.com/71131248/184040411-cfb4ad9a-30fd-4482-92f8-d65964ca3b49.png">

- 댓글 많은 순으로 정렬
- sort 모달에서 최신순, 업데이트 순, 댓글 순으로 정렬 가능
- Intersection Observer를 통한 무한 스크롤
- Open된 이슈와 Closed된 이슈를 나눠 렌더링

## 이슈 디테일 페이지

<img width="1000" alt="스크린샷 2022-08-11 오전 8 34 59" src="https://user-images.githubusercontent.com/71131248/184040830-8858b3d7-2bad-4abc-918e-a745f8044a9e.png">

- 해당 이슈 내용 markdown 형식으로 변환해 렌더링
- 해당 이슈 reaction label 데이터 변환해 렌더링

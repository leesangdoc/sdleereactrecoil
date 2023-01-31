import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@/styles/globalStyle';
import React from 'react';

/*
    next js의 모든 page는 렌더링을 거치기 전에 _app.js 를 거친다고 한다.
    즉, 각 해당 페이지의 상위에 _app.js 의 root 레이아웃이 존재한다. 
    그리고 해당 app.js 는 자유롭게 커스터마이징이 가능하다.
    페이지 전환 시 레이아웃을 유지할 수 있다.
    페이지 전환 시 상태 값을 유지할 수 있다.
    componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있다.
    추가적인 데이터를 페이지로 주입시키는 게 가능하다.
    글로벌 css를 이곳에 선언한다.
    props로 넘어온 Component는 현재 page를 의미한다. page 전환 시 Component props가 변경된다.
    pageProps는 data fetching method를 통해 미리 가져온 초기 객체이다. 이 method를 사용하지 않으면 빈 객체가 전달된다.
    
    function MyApp({ Component, pageProps }: AppProps) {}
    인자설명: 
    - Component: 각 페이지 컴포넌트들이 오게 되고, 
    - pageProps: getInitialProps(next js의 서버사이드 실행 로직)를 통해 내려 받은 props들을 나타낸다.
*/
function MyApp({ Component, pageProps }: AppProps) {
  // 이렇게 해야 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않는다.
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
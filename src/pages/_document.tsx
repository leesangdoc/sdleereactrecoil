import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
/*
    _document.tsx는 _app.tsx 다음에 실행되며,
    공통적으로 활용할 <head>나 <body> 태그 안에 들어갈 내용들을 커스텀 할 때 활용한다. 
    _document.tsx 파일에 css를 미리 적용하면 css 로딩이 늦어 깜빡이는 현상을 방지할 수 있다.
    componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있다.
    서버에서만 렌더링되고, onClick 같은 event handler는 작동하지 않는다.
    여기서는 css도 사용하지 않는다. 
    _document.js에서 사용하는 Head와 _app.js에서 사용하는 Head는 다르다.
*/
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {' '}
            {initialProps.styles} {sheet.getStyleElement()}{' '}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}


import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  checkLegacyIE = `
(function() {
  if (document['documentMode'] === 11 && navigator.userAgent.indexOf('Windows NT 10.0') > -1) {
    window.location.href = 'microsoft-edge:' + document.URL;
    setTimeout(function() {
      window.location.href = 'https://support.microsoft.com/office/the-website-you-were-trying-to-reach-doesn-t-work-with-internet-explorer-8f5fc675-cd47-414c-9535-12821ddfc554';
    }, 50);
  }else if (document['documentMode'] <= 11) {
    var paragraph = document.createElement('p');
    var message = document.createTextNode('Sorry, Browser version is not supported. Please use a modern browser.');
    paragraph.appendChild(message);
    var edgeParagraph = document.createElement('p');
    var edgeAnchor = document.createElement('a');
    var edgeAnchorText = document.createTextNode('Microsoft Edge');
    edgeAnchor.appendChild(edgeAnchorText);
    edgeAnchor.setAttribute('href', 'https://www.microsoft.com/edge');
    edgeAnchor.setAttribute('target', '_blank');
    edgeParagraph.appendChild(edgeAnchor);
    var chromeParagraph = document.createElement('p');
    var chromeAnchor = document.createElement('a');
    var chromeAnchorText = document.createTextNode('Google Chrome');
    chromeAnchor.appendChild(chromeAnchorText);
    chromeAnchor.setAttribute('href', 'https://www.google.com/chrome');
    chromeAnchor.setAttribute('target', '_blank');
    chromeParagraph.appendChild(chromeAnchor);
    document.body.appendChild(paragraph);
    document.body.appendChild(edgeParagraph);
    document.body.appendChild(chromeParagraph);
  }
})();`

  getInitialColorMode = `
(function() {
  function getInitialColorMode() {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const persistedColorPreference = window.localStorage.getItem('color-mode');

      if (persistedColorPreference) {
        return persistedColorPreference;
      }

      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
      if (systemPreference.matches) {
        return 'dark';
      }
      return 'light';
    }
  }
  const colorMode = getInitialColorMode();
  document.documentElement.style.setProperty(
    'background-color',
    colorMode === 'light' ? '#FFFFFF' : '#000000'
  );
  document.documentElement.setAttribute('data-theme', colorMode);
})()`;

  render() {
    return (
      <Html>
        <script dangerouslySetInnerHTML={{ __html: this.checkLegacyIE }} />
        <script dangerouslySetInnerHTML={{ __html: this.getInitialColorMode }} />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
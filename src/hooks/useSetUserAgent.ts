import { useEffect } from 'react';
import { UAParser } from 'ua-parser-js';

export const useSetUserAgent = () => {
  const browser = UAParser();

  useEffect(() => {
    if (browser?.browser?.name) {
      document.body.classList.add(
        browser.browser.name.replaceAll(' ', '-').toLowerCase()
      );
    }
    if (browser?.engine?.name) {
      document.body.classList.add(
        browser.engine.name.replaceAll(' ', '-').toLowerCase()
      );
    }
    if (browser?.os?.name) {
      document.body.classList.add(
        browser.os.name.replaceAll(' ', '-').toLowerCase()
      );
    }
  }, []);
};

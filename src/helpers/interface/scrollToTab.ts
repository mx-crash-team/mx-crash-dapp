export const scrollToTab = (tab: string, timeout?: number) => {
  const activeTabSection = document.querySelector(`.tab-pane.${tab}`);
  setTimeout(() => {
    if (activeTabSection) {
      activeTabSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  }, timeout);
};

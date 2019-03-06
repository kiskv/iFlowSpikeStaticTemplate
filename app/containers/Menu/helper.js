export const getDrawerMode = (drawerMode, currentWidth) => {
  if (currentWidth !== document.body.offsetWidth) {
    if (document.body.offsetWidth > 1100 && drawerMode === 'overlap') {
      return 'shrink';
    }
    if (document.body.offsetWidth < 1100 && drawerMode === 'shrink') {
      return 'overlap';
    }
  }
  return null;
};
  
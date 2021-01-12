const unFocus = (): null => {
  const styleText =
    '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
  const unfocusStyle = document.createElement('STYLE');

  document.getElementsByTagName('HEAD')[0].appendChild(unfocusStyle);
  document.addEventListener('mousedown', () => {
    unfocusStyle.innerHTML = `${styleText}}`;
  });
  document.addEventListener('keydown', () => {
    unfocusStyle.innerHTML = '';
  });

  return null;
};

export default unFocus;

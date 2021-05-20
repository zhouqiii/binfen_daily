const checkInput = (val, submit, style) => {
  let flag = true;
  let dis = submit;
  let css = style;
  val.forEach((item) => {
    if (!item.workContent) {
      flag = false;
    }
  });
  if (flag) { // flag=true说明工作内容不为空
    dis = false;
    css = 'background:rgb(102, 102, 102)';
    return (dis, css);
  }
  dis = true;
  css = 'background:#d3d3d3';
  return (dis, css);
};
// eslint-disable-next-line import/prefer-default-export
export { checkInput };

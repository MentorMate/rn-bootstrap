interface {{upperFirst name}}Result {
  yourReturnValue: string;
}

export const {{name}} = (): {{upperFirst name}}Result => {
  return {
    yourReturnValue: ''
  };
};

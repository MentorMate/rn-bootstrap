interface {{capitalize hookName}}Result {
  yourReturnValue: string;
}

export const {{hookName}} = (): {{capitalize hookName}}Result => {
  return {
    yourReturnValue: ''
  };
};

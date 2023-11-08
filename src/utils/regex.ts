function IsPhoneNumberReg(value: string) {
    const phoneRegex = /^[0-9+()\- ]*$/;
    return phoneRegex.test(value);
  }
  export { IsPhoneNumberReg}
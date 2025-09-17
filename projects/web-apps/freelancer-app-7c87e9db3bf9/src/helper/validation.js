const validationHelper = {};

validationHelper.required = value => {
  let isValid = 1;
  let message = '';

  // to avoid check for boolean scenario individual check is applied
  if ([null, undefined, ''].includes(value)) {
    message = 'This field is required';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.name = value => {
  let {isValid, message} = validationHelper.required(value);
  const nameRegex = /^[a-zA-Z\s']*$/;
  if (isValid && (!nameRegex.test(value) || value.length < 3)) {
    message = 'Invalid name';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.lastName = value => {
  let {isValid, message} = validationHelper.required(value);
  const nameRegex = /^[a-zA-Z\s']*$/;
  if (isValid && (!nameRegex.test(value) || value.length < 3)) {
    message = 'Invalid name';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.pan = value => {
  let {isValid, message} = validationHelper.required(value);

  const panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (isValid && !panRegex.test(value)) {
    message = 'Invalid Pan format';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.aadhar = value => {
  let {isValid, message} = validationHelper.required(value);
  const aadharRegex =
    /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
  if (isValid && !aadharRegex.test(value)) {
    message = 'Invalid Aadhar format';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.dateOfBirth = value => {
  let {isValid, message} = validationHelper.required(value);

  return {isValid, message};
};

validationHelper.email = value => {
  let {isValid, message} = validationHelper.required(value);

  const emailRegex = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  if (isValid && !emailRegex.test(value)) {
    message = 'Invalid Email format';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.mobile = value => {
  let {isValid, message} = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    message = 'Invalid mobile number';
  }
  const phoneNo = /^[6-9]\d{11}$/gi;
  if (isValid && !phoneNo.test(value)) {
    message = 'Invalid mobile number';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.otp = value => {
  let {isValid, message} = validationHelper.required(value);

  if (isValid && value.length !== 6) {
    message = 'Invalid OTP';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.pinCode = value => {
  let {isValid, message} = validationHelper.required(value);

  if (isValid && value.length !== 6) {
    message = 'Invalid PinCode';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.ifscCode = value => {
  let {isValid, message} = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    message = 'Invalid IFSC Code';
  }
  const ifscCode = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  if (isValid && !ifscCode.test(value)) {
    message = 'Please Profive Valid IFSC Code';
    isValid = 0;
  }

  return {isValid, message};
};

validationHelper.accountNumber = value => {
  let {isValid, message} = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    message = 'Invalid Account Number';
  }
  const accountNumber = /^[0-9]{9,18}$/gi;
  if (isValid && !accountNumber.test(value)) {
    message = 'Please Provide Valid Account Number';
    isValid = 0;
  }

  return {isValid, message};
};
export {validationHelper};

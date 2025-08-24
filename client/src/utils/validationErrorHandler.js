export function handleValidationError(error, setValidationError) {
  const errorResponseData = error?.response?.data;
  if (Object.hasOwn(errorResponseData, 'joiError')) {
    setValidationError(errorResponseData.joiError);
  } else if (Object.hasOwn(errorResponseData, 'multerError')) {
    setValidationError(errorResponseData.multerError);
  } else {
    window.location = '/error';
  }
}

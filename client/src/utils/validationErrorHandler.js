export function handleValidationError(error, setValidationError) {
  const errorResponseData = error?.response?.data;
  if (Object.hasOwn(errorResponseData, 'joiError')) {
    setValidationError(errorResponseData.joiError);
  }
  if (Object.hasOwn(errorResponseData, 'multerError')) {
    setValidationError(errorResponseData.multerError);
  }
  if (Object.hasOwn(errorResponseData, 'cloudinaryError')) {
    setValidationError(errorResponseData.cloudinaryError);
  }
}

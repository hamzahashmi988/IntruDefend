export function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = ""
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File) {
        formData.append(formKey, value);
      } else if (value instanceof Blob) {
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          objectToFormData({ [`${key}[${index}]`]: item }, formData, parentKey);
        });
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }
  return formData;
}

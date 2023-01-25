export function disableBack() {
  if (
    window.location.pathname.includes(
      "registration-profile" | "registration-success"
    )
  )
    history?.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(1);
  };
}

export function noWhiteSpace(yup) {
  yup.addMethod(yup.string, "noWhiteSpace", function (errorMessage) {
    return this.test(`test-whitespace`, errorMessage, function (value) {
      const { path, createError } = this;
      return (
        (value && value.trim() !== "") ||
        createError({ path, message: errorMessage })
      );
    });
  });
}

export function onlyAlphabet(yup) {
  yup.addMethod(yup.string, "onlyAlphabet", function (errorMessage) {
    return this.test(`test-onlyAlphabet`, errorMessage, function (value) {
      const { path, createError } = this;
      return  /^[A-Za-z ]+$/.test(value) || createError({ path, message: errorMessage });
    });
  });
}

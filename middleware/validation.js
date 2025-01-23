export const validationFun = (schema) => {
  return (req, res, next) => {
    const valid = schema.body.validate(req.body, { abortEarly: false });
    if (valid.error) {
      return res.json({ message: "error", errors: valid.error });
    }
    next();
  };
};


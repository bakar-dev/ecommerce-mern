export default (thisFunc) => (req, res, next) => {
  Promise.resolve(thisFunc(req, res, next)).catch(next);
};

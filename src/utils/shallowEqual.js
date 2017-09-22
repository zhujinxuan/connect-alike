// Whether bonj is \in aobj
function shallowEqual(aobj, bobj) {
  if (aobj === bobj) {
    return true;
  }

  if (!(aobj instanceof Object && bobj instanceof Object)) {
    return aobj === bobj;
  }

  for (const k in bobj) {
    if (aobj[k] !== bobj[k]) {
      return false;
    }
  }
  return true;
}
export default shallowEqual;

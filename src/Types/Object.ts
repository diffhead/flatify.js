import ObjectKeyType from "./ObjectKeyType";
import ObjectValueType from "./ObjectValueType";

type Object = {[key in ObjectKeyType]: ObjectValueType};

export default Object

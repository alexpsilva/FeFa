import BaseModel from "./model/base";

type byId<T extends BaseModel> = { [key: string]: T }

export default byId
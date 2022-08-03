import { globalConfigs } from "../configs/global-configs"

export const hasSelectedDB = () =>{
    return globalConfigs.DB_Selected !== "";
}

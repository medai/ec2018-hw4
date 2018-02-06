// Models
import { Log } from "./Log";

export interface Project {
  projectId: string,
  name: string,
  logs: Log[]
}

/* 
Place to hold typescript types that don't need to be exported
*/

import { ZodIssue } from "zod"

// return type for any server actions
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] }

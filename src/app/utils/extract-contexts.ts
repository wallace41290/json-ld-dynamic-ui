import { HasContext } from "../models";
import { ExtractedContexts } from "./extracted-contexts.model";

/**
 * From a resource that implements `HasContext` determine all the contexts
 * that are embeded, and gather the reference URLs so they can be resolved.
 */
export function extractContexts(resource: HasContext): ExtractedContexts {
  const embeddedContexts = new Array<Context>();
  const referencedContexts = new Array<string>();

  const context: string | Context | Array<string | Context> =
    resource["@context"];
  if (typeof context === "string") {
    referencedContexts.push(context);
  } else if (isContext(context)) {
    embeddedContexts.push(context);
  } else {
    for (let c of context) {
      if (typeof c === "string") {
        referencedContexts.push(c);
      } else if (isContext(c)) {
        embeddedContexts.push(c);
      } else {
        console.error(
          `Found unknown context type: ${c}`,
          c,
          "In context:",
          context
        );
      }
    }
  }

  return new ExtractedContexts(embeddedContexts, referencedContexts);
}

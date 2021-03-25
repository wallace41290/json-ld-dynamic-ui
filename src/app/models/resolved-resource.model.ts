import { HasContext, Context, Term } from "./json-ld";
import { GenericResource } from "./generic-resource.model";

export class ResolvedResouce<R extends HasContext> {
  constructor(
    public resource: R,
    public contexts: Context[],
    public contextTerms: Map<Term, GenericResource>
  ) {}
}

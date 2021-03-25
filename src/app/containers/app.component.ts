import { Component, OnInit } from "@angular/core";
import { MockApiService } from "../services";
import { concatMap, map } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { TermMap } from "../models";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private mockApiService: MockApiService) {}

  ngOnInit() {
    this.mockApiService
      // Get the resource
      .getClassification("subjects_v1")
      .pipe(
        // Get the context
        concatMap(classification => {
          const contextIri: string = Array.isArray(classification["@context"])
            ? (classification["@context"][0] as string)
            : classification["@context"];
          return this.mockApiService.getContext(contextIri).pipe(
            // Get the terms
            concatMap(context => {
              const terms = new Array<TermMap>();
              for (let prop in context) {
                if (context.hasOwnProperty(prop)) {
                  terms.push(new TermMap(prop, context[prop]));
                }
              }
              const termObs = terms.map(term =>
                this.mockApiService.getTerm(term)
              );
              return forkJoin(termObs);
            }),

            map(context => ({ classification, context }))
          );
        })
      )
      .subscribe(({ classification, context }) => {
        console.log("classification", classification);
        console.log("context", context);
      });
  }
}

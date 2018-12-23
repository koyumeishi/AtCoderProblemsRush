import { ApplicationAtCoder } from './atcoder/ApplicationAtCoder';
import { ScraperBetaAtCoder } from './atcoder/ScraperBetaAtcoder';
import { ScraperOldAtCoder } from './atcoder/ScraperOldAtcoder';
import { ApplicationAtCoderProblems } from './kenkooo/ApplicationAtCoderProblems';
import { Site, siteChecker } from './util/SiteChecker';

class AtCoderProblemsRush {
  private site: Site;
  constructor() {
    this.site = siteChecker(document.location.href);
  }

  public run(): void {
    switch (this.site) {
      case Site.BetaAtCoder:
        (() => {
          const app: ApplicationAtCoder<ScraperBetaAtCoder> = new ApplicationAtCoder(ScraperBetaAtCoder);
          app.updateSubmissions();
        })();
        break;

      case Site.OldAtCoder:
        (() => {
          const app: ApplicationAtCoder<ScraperOldAtCoder> = new ApplicationAtCoder(ScraperOldAtCoder);
          app.updateSubmissions();
        })();
        break;

      case Site.AtCoderProblems:
        (() => {
          const app: ApplicationAtCoderProblems = new ApplicationAtCoderProblems();
          const containerDom: Element = document.querySelector('div.container > div.container');
          const observerOptions: any = {
            attributes: true,
            childList: true,
            subtree: true,
          };
          const observer = new MutationObserver((mutations: MutationRecord[], obs: MutationObserver) => {
            console.log((new Date()).toTimeString());
            console.log('mutation observed. update submissions');
            obs.disconnect();
            app.updateSubmissions();
            app.applySavedSubmissions();
            obs.observe(containerDom, observerOptions);
          });
          app.updateSubmissions();
          app.applySavedSubmissions();
          observer.observe(containerDom, observerOptions);
        })();
        break;

      default:
        break;
    }
  }
}

(() => {
  'use strict';
  // Your code here...

  const app: AtCoderProblemsRush = new AtCoderProblemsRush();
  app.run();
})();

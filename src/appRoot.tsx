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
        {
          const app: ApplicationAtCoder<ScraperBetaAtCoder> = new ApplicationAtCoder(ScraperBetaAtCoder);
          app.updateSubmissions();
          break;
        }

      case Site.OldAtCoder:
        {
          const app: ApplicationAtCoder<ScraperOldAtCoder> = new ApplicationAtCoder(ScraperOldAtCoder);
          app.updateSubmissions();
          break;
        }

      case Site.AtCoderProblems:
        {
          const app: ApplicationAtCoderProblems = new ApplicationAtCoderProblems();
          const updateTrial: any = (resolve: any, reject: any, maxRetry: number, time: number) => {
            if (maxRetry <= 0) {
              reject();
              return;
            }
            console.log('Scraping problem table ...');
            if (app.updateSubmissions() === true) {
              app.applySavedSubmissions();
              console.log('Done');
              resolve();
            } else {
              console.log(`Failed scraping. retry in ${time} sec.`);
              setTimeout(
                () => updateTrial(resolve, reject, maxRetry - 1, time),
                time);
            }
          };
          const doneFetchingProblems = new Promise((resolve, reject) => {
            updateTrial(resolve, reject, 10, 2000);
          });

          const watchTable: any = (resolve: any, reject: any, maxRetry: number, time: number) => {
            if (maxRetry <= 0) {
              resolve();
              return;
            }
            console.log('Scraping problem table (watching table mode) ...');
            app.updateSubmissions();
            console.log(`Done scraping. retry in ${time} sec. retry will run ${maxRetry} times.`);
            setTimeout(
              () => watchTable(resolve, reject, maxRetry - 1, time),
              time);
          };

          doneFetchingProblems.then(r => new　Promise(
              (resolve, reject) => {
                watchTable(resolve, reject, 6, 10000);
              }))
            .then(() => console.log('finish watching'));

          break;
        }

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

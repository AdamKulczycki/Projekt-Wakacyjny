import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { RejectsService } from '../services/rejects.service';
import { ReportsService } from '../services/reports.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article-model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public viewSelector: string = 'articles';
  public articles: Array<Article> = [];
  public reportsArray: Array<any> = [];

  constructor(private articlesService: ArticlesService,
    private rejectsService: RejectsService,
    private reportsService: ReportsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {

    this.articlesService.getPendingArtciles()
      .subscribe(
        (res) => {
          this.articles = res;
        },
        (err) => {
          this.toastr.error('Server Error!');
        }
      );

    // this.reportsService.getIdsOfReportedArticles()
    //   .subscribe(
    //     (res: Array<number>) => {
    //       res.forEach(id => {
    //         let article: Article;
    //         this.articlesService.getArticle(id)
    //           .subscribe(
    //             articleRes => article = articleRes,
    //             err => console.log(err)
    //             );
    //         this.reportsService.getReportsByArticleId(id)
    //           .subscribe(
    //             (reports: Report[]) => {
    //               this.reportsArray.push({
    //                 articleObject: article,
    //                 showArticle: false,
    //                 showPanel: false,
    //                 articleReports: reports
    //               });
    //               this.reportsNumber += reports.length;
    //             },
    //             (err) => console.log(err)
    //           );
    //       });
    //     },
    //     (err) => console.log(err)
    //   );
    // this.reportsArray = this.reportsService.test();
    //  this.reportsService.test().subscribe(
    //    res => {
    //      res[0].subscribe(
    //        e => console.log(e)
    //      )
    //    }
    //  )
  //  this.reportsService.test();
     this.reportsArray = this.activatedRoute.snapshot.data['test'];
     console.log(this.reportsArray);
    // console.log(this.activatedRoute.snapshot.data['test'])
    }

  onSubmit(f, id): void {
    const index = this.articles.map(e => e.id).indexOf(id);
    if (!f.value.reason) {
      const payload = {
        status: 'ACCEPTED'
      };
      this.articlesService.patchArticle(id, payload)
        .subscribe(
          (res) => {
            this.toastr.success('Status changed!', 'Success!');
            this.articles.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    } else {
      if (!f.value.otherReason) {
        this.rejectsService.rejectArticle(id, f.value.reason)
          .subscribe(
            (res) => {
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            (err) => {
              this.toastr.error('Server Error!');
            }
          );
      } else {
        this.rejectsService.rejectArticle(id, f.value.otherReason)
          .subscribe(
            (res) => {
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            (err) => {
              this.toastr.error('Server Error!');
            }
          );
      }
    }
  }
  onSubmitFromReportsPanel(f, id): void { // manage reports
    const index = this.reportsArray.map(e => e.articleObject.id).indexOf(id);
    if (!f.value.otherReason) {
      this.rejectsService.rejectArticle(id, f.value.reason)
        .subscribe(
          (res) => {
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsArray.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    } else {
      this.rejectsService.rejectArticle(id, f.value.otherReason)
        .subscribe(
          (res) => {
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsArray.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    }
  }
  viewSelectorChange(value): void {
    this.viewSelector = value;
  }
  viewArticleChange(index): void {
    this.reportsArray[index].showArticle = !this.reportsArray[index].showArticle;
  }
  deleteAllreports(index): void {
    const numberOfReports = this.reportsArray[index].articleReports.length;
    let reportsDeleted = 0;
    this.reportsArray[index].articleReports.forEach(element => {
      this.reportsService.deleteReport(element.id)
        .subscribe(
          (res) => {
            reportsDeleted ++;
            if (numberOfReports === reportsDeleted) {
              this.toastr.success('Reports deleted!', 'Success!');
              this.reportsArray.splice(index, 1);
            }
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    });
  }
  ngOnInit() {

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../../models/article-model';
import { Comment } from '../../../models/comment-model';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private articlesService: ArticlesService) { }

  id: number;
  article = new Article(1, 'Ramen', 'https://www.youtube.com/embed/B8y3SSmz4sg', '10/01/2018', 201, 'Admin', 'Kitchen');
  comments = [new Comment(1, 'Babciu, to jest zajebiste!', '20/08/2018', 3312, 'wnusio', [new Comment(99, 'super', '20/08/2018', 231, 'babcia', [new Comment(1, 'tez sie ciesze babciu', '20/08/2018', 11, 'wnusio', [])]), new Comment(1, 'tez sie ciesze babciu', '20/08/2018', 11, 'wnusio', [])]),
  new Comment(2, 'Genialny przepis na ramen', '23/08/2018', 12, 'kucharczyk', []),
  new Comment(3, 'Skipnalem te czesc o gotowaniu i od razu przeszedlem do kapieli, swietnie dziala na skore. Polecam Skipnalem te czesc o gotowaniu i od razu przeszedlem do kapieli, swietnie dziala na skore. Polecam', '29/08/2018', 33, 'spa', []),
  new Comment(4, 'Ja za to sie wykapalem a potem zjadlem ten makaron, smakowal jeszcze lepiej', '18/07/2018', 4341232, 'smakosz', []),
  new Comment(5, 'co za debil', '01/07/2018', 0, 'krytyk', []),
  new Comment(6, 'tyle zmarnowanego makaronu, a dzieci w afryce gloduja', '24/08/2018', 2, 'zniesmaczona', []),
];

  ngOnInit() {
    this.router.events.subscribe(() => { // przenosi na gore strony po wczytaniu artykulu
      window.scrollTo(0, 0);
    });
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
      this.article = this.articlesService.getArtcile(this.id);
    });
  }

}


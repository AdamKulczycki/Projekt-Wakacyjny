export class Comment {
    constructor(public id: number, public content: string, public created: string, public likes: number, public author: string, public subcomments: Comment[] ) {}
}

// public parentComments: number, public parentArticle: number

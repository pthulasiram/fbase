import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private meta: Meta) { }
  generateTags(config) {

    //     <!-- Place this data between the <head> tags of your website -->
    // <title>Page Title. Maximum length 60-70 characters</title>
    // <meta name="description" content="Page description. No longer than 155 characters." />

    // <!-- Schema.org markup for Google+ -->
    // <meta itemprop="name" content="The Name or Title Here">
    // <meta itemprop="description" content="This is the page description">
    // <meta itemprop="image" content="http://www.example.com/image.jpg">
    // <meta charset="UTF-8">
    // <meta name="description" content="Free Web tutorials">
    // <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    // <meta name="author" content="John Doe">
    document.title = config.title;
    this.meta.updateTag({ name: 'description', content: config.title });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });
    // Google plus
    this.meta.updateTag({ name: 'itemprop:name', content: config.title });
    this.meta.updateTag({ name: 'itemprop:description', content: config.title });
    // TWITTER
    this.meta.updateTag({ name: 'twitter:card', content: config.content });
    this.meta.updateTag({ name: 'twitter:site', content: '@' + config.site });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    // this.meta.updateTag({ name: 'twitter:image', content: config.image });
    // FB
    this.meta.updateTag({ property: 'og:type', content: config.content });
    this.meta.updateTag({ property: 'og:site_name', content: config.site });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    // this.meta.updateTag({ property: 'og:image', content: config.image });
    // this.meta.updateTag({ property: 'og:url', content: `https://instafire-app.firebaseapp.com/${config.slug}` });
  }
}

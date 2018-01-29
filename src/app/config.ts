export class Config {
    content: string;
    site: String = 'JanaSenaParty';
    title: string;
    description: string;
    keywords: String = '';

    updateKeyWords(keys: Array<string>) {
        keys.forEach((k: string) => {
            this.keywords = this.keywords.concat(k);
            this.keywords = this.keywords.concat(',');
        });
    }
}

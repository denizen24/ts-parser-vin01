import { log } from 'console';
import * as puppeteer from 'puppeteer';

class Avtoinfo {
    public grabUrl: string;
    public url: string;
    private page!: puppeteer.Page;
    private browser!: puppeteer.Browser;
    constructor() {
        this.url = 'https://vin01.ru/index.php';
        this.grabUrl = 'https://vin01.ru/index.php';
    }

    public async destroyBrowser() {
        await this.browser.close();
    }

    public async connectVin01(grz:string): Promise<any> {
        try {
            let resultQuery;
            const page = await this.createPage();
            await page.goto(this.url);
            await page.type('#num.form-control.input-lg', (grz.toUpperCase()));
            await page.waitFor(1000);
            let countCheck = 0;
            while (countCheck < 5) {
                await page.click('#searchByGosNumberButton');
                await page.waitFor(7000);
                const dataVin01 = async () => {
                    const result = await page.evaluate(() => {
                        let vinNumber: string | undefined;
                        let errMsg: string | undefined | null;
                        // tslint:disable-next-line: no-angle-bracket-type-assertion
                        if (<HTMLSelectElement>(document.querySelectorAll('#vinNumbers')[0])) {
                            // tslint:disable-next-line: no-angle-bracket-type-assertion
                            vinNumber = (<HTMLSelectElement>(document.querySelectorAll('#vinNumbers')[0])).value;
                        }
                        // tslint:disable-next-line: no-angle-bracket-type-assertion
                        if (<HTMLElement>(document.querySelectorAll('#noMatchVin')[0])) {
                            // tslint:disable-next-line: no-angle-bracket-type-assertion
                            errMsg = (<HTMLElement>(document.getElementById('noMatchVin'))).textContent;
                        }
                        return {
                            errMsg: errMsg?errMsg:null,
                            vinNumber: vinNumber?vinNumber:null
                        }
                    });
                    return result;
                }
                countCheck++;
                const res = await dataVin01();
                resultQuery = res;
                if (res.vinNumber == null) {
                    await page.click('.modal-header .close');
                    await page.waitFor(1000);
                } else {
                    break;
                }
            }
            return resultQuery;
            await page.waitFor(1000);
            this.page = page;
        } catch (e) {
            throw e;
        } finally {
            await this.destroyBrowser();
        }
    }

    private async createPage(): Promise<puppeteer.Page> {
        this.browser = await this.createBrowser();
    
        return this.browser.newPage();
    }
    
    private async createBrowser(): Promise<puppeteer.Browser> {
        return puppeteer.launch({ slowMo: 50, headless: false });
    }
}

const apiAvtocod = new Avtoinfo();

// тест apiAvtocod.connectVin01();
// (() => {
//     const result = apiAvtocod.connectVin01('н490оу11');
//     result.then((res) => {
//         log('connectVin01 = ', res);
//     });
// })();

export {
    Avtoinfo,
};


// const puppeteer = require('puppeteer');
// const diff = require('diff');
// const nodemailer = require('nodemailer');
// const fs = require('fs').promises;
// const cron = require('node-cron');
// require('dotenv').config();

// class WebUpdateTracker {
//     constructor(url, cronSchedule, emailConfig) {
//         this.url = url;
//         this.cronSchedule = cronSchedule;
//         this.emailConfig = emailConfig;
//         this.previousContent = '';
//         this.transporter = nodemailer.createTransport(emailConfig);
//     }

//     async initialize() {
//         try {
//             this.previousContent = await this.loadPreviousContent();
//             if (!this.previousContent) {
//                 console.log('Aucun contenu précédent trouvé. Initialisation...');
//                 this.previousContent = await this.fetchContent();
//                 await this.savePreviousContent(this.previousContent);
//             }
//             console.log('Initialisation réussie.');
//         } catch (error) {
//             console.error('Erreur lors de l\'initialisation:', error);
//         }
//     }

//     async fetchContent() {
//         const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
//         try {
//             const page = await browser.newPage();
//             await page.goto(this.url, { waitUntil: 'networkidle0' });
//             const content = await page.content();
//             return content;
//         } finally {
//             await browser.close();
//         }
//     }

//     async checkForUpdates() {
//         try {
//             const currentContent = await this.fetchContent();
//             const changes = diff.diffLines(this.previousContent, currentContent);
//             const significantChanges = changes.filter(change => change.added || change.removed);

//             if (significantChanges.length > 0) {
//                 console.log('Mise à jour détectée!');
//                 await this.notifyUser(changes);
//                 this.previousContent = currentContent;
//                 await this.savePreviousContent(currentContent);
//             } else {
//                 console.log('Aucune mise à jour significative détectée.');
//             }
//         } catch (error) {
//             console.error('Erreur lors de la vérification des mises à jour:', error);
//             await this.notifyError(error);
//         }
//     }

//     async notifyUser(changes) {
//         const changesText = changes.map(change => {
//             const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
//             return prefix + change.value;
//         }).join('');

//         const mailOptions = {
//             from: this.emailConfig.auth.user,
//             to: this.emailConfig.to,
//             subject: `Mise à jour détectée sur ${this.url}`,
//             text: `Des mises à jour ont été détectées sur ${this.url}.\n\nChangements:\n${changesText}`
//         };

//         try {
//             console.log('Envoi de l\'email avec les options:', mailOptions);
//             await this.transporter.sendMail(mailOptions);
//             console.log('Notification envoyée par e-mail.');
//         } catch (error) {
//             console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
//         }
//     }

//     async notifyError(error) {
//         const mailOptions = {
//             from: this.emailConfig.auth.user,
//             to: this.emailConfig.to,
//             subject: `Erreur lors de la vérification de ${this.url}`,
//             text: `Une erreur s'est produite lors de la vérification de ${this.url}:\n${error.message}`
//         };

//         try {
//             console.log('Envoi de l\'email d\'erreur avec les options:', mailOptions);
//             await this.transporter.sendMail(mailOptions);
//             console.log('Notification d\'erreur envoyée par e-mail.');
//         } catch (emailError) {
//             console.error('Erreur lors de l\'envoi de l\'e-mail d\'erreur:', emailError);
//         }
//     }

//     async loadPreviousContent() {
//         try {
//             return await fs.readFile('previous_content.html', 'utf8');
//         } catch (error) {
//             if (error.code === 'ENOENT') {
//                 return ''; // Fichier non trouvé, retourner une chaîne vide
//             }
//             throw error;
//         }
//     }

//     async savePreviousContent(content) {
//         await fs.writeFile('previous_content.html', content, 'utf8');
//     }

//     start() {
//         this.initialize().then(() => {
//             cron.schedule(this.cronSchedule, () => this.checkForUpdates());
//             console.log(`Suivi démarré pour ${this.url}`);
//         });
//     }
// }

// // Configuration et utilisation
// const url = process.env.WEBSITE_URL || 'https://talentpro.itmafrica.com/fr';
// const cronSchedule = process.env.CRON_SCHEDULE || '*/15 * * * *'; // Toutes les 15 minutes par défaut
// const emailConfig = {
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: process.env.EMAIL_SECURE === 'true',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     to: process.env.EMAIL_TO
// };

// const tracker = new WebUpdateTracker(url, cronSchedule, emailConfig);
// tracker.start();







// const puppeteer = require('puppeteer');
// const diff = require('diff');
// const nodemailer = require('nodemailer');
// const fs = require('fs').promises;
// const cron = require('node-cron');
// require('dotenv').config();

// class WebUpdateTracker {
//     constructor(url, cronSchedule, emailConfig, waitSelector = null) {
//         this.url = url;
//         this.cronSchedule = cronSchedule;
//         this.emailConfig = emailConfig;
//         this.waitSelector = waitSelector;
//         this.previousContent = '';
//         this.transporter = nodemailer.createTransport(emailConfig);
//     }

//     async initialize() {
//         try {
//             this.previousContent = await this.loadPreviousContent();
//             if (!this.previousContent) {
//                 console.log('Aucun contenu précédent trouvé. Initialisation...');
//                 this.previousContent = await this.fetchContent();
//                 await this.savePreviousContent(this.previousContent);
//             }
//             console.log('Initialisation réussie.');
//         } catch (error) {
//             console.error('Erreur lors de l\'initialisation:', error);
//         }
//     }

//     async fetchContent() {
//         const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
//         try {
//             const page = await browser.newPage();
//             await page.goto(this.url, { waitUntil: 'networkidle0' });

//             if (this.waitSelector) {
//                 await page.waitForSelector(this.waitSelector, { timeout: 30000 });
//             }

//             return await page.content();
//         } finally {
//             await browser.close();
//         }
//     }

//     async checkForUpdates() {
//         try {
//             const currentContent = await this.fetchContent();
//             const changes = diff.diffLines(this.previousContent, currentContent);
//             const significantChanges = changes.filter(change => change.added || change.removed);

//             if (significantChanges.length > 0) {
//                 console.log('Mise à jour détectée!');
//                 await this.notifyUser(changes);
//                 this.previousContent = currentContent;
//                 await this.savePreviousContent(currentContent);
//             } else {
//                 console.log('Aucune mise à jour significative détectée.');
//             }
//         } catch (error) {
//             console.error('Erreur lors de la vérification des mises à jour:', error);
//             await this.notifyError(error);
//         }
//     }

//     async notifyUser(changes) {
//         const changesHtml = changes.map(change => {
//             const style = change.added ? 'color: green;' : change.removed ? 'color: red;' : 'color: black;';
//             const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
//             return `<span style="${style}">${prefix}${change.value}</span>`;
//         }).join('<br>');

//         const mailOptions = {
//             from: this.emailConfig.auth.user,
//             to: this.emailConfig.to,
//             subject: `Mise à jour détectée sur ${this.url}`,
//             html: `<p>Des mises à jour ont été détectées sur ${this.url}.</p><pre>${changesHtml}</pre>`
//         };

//         try {
//             console.log('Envoi de l\'email avec les options:', mailOptions);
//             await this.transporter.sendMail(mailOptions);
//             console.log('Notification envoyée par e-mail.');
//         } catch (error) {
//             console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
//         }
//     }

//     async notifyError(error) {
//         const mailOptions = {
//             from: this.emailConfig.auth.user,
//             to: this.emailConfig.to,
//             subject: `Erreur lors de la vérification de ${this.url}`,
//             text: `Une erreur s'est produite lors de la vérification de ${this.url}:\n${error.message}`
//         };

//         try {
//             console.log('Envoi de l\'email d\'erreur avec les options:', mailOptions);
//             await this.transporter.sendMail(mailOptions);
//             console.log('Notification d\'erreur envoyée par e-mail.');
//         } catch (emailError) {
//             console.error('Erreur lors de l\'envoi de l\'e-mail d\'erreur:', emailError);
//         }
//     }

//     async loadPreviousContent() {
//         try {
//             return await fs.readFile('previous_content.html', 'utf8');
//         } catch (error) {
//             if (error.code === 'ENOENT') {
//                 return ''; // Fichier non trouvé, retourner une chaîne vide
//             }
//             throw error;
//         }
//     }

//     async savePreviousContent(content) {
//         await fs.writeFile('previous_content.html', content, 'utf8');
//     }

//     start() {
//         this.initialize().then(() => {
//             cron.schedule(this.cronSchedule, () => this.checkForUpdates());
//             console.log(`Suivi démarré pour ${this.url}`);
//         });
//     }
// }

// // Configuration et utilisation
// const url = process.env.WEBSITE_URL || 'https://talentpro.itmafrica.com/fr';
// const cronSchedule = process.env.CRON_SCHEDULE || '*/15 * * * *'; // Toutes les 15 minutes par défaut
// const emailConfig = {
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: process.env.EMAIL_SECURE === 'true',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     to: process.env.EMAIL_TO
// };

// // Attendre un sélecteur spécifique pour les sites utilisant des frameworks JavaScript dynamiques
// const waitSelector = process.env.WAIT_SELECTOR || null;

// const tracker = new WebUpdateTracker(url, cronSchedule, emailConfig, waitSelector);
// tracker.start();



const puppeteer = require('puppeteer-core');
// require('puppeteer-core/utils/install.js');
const diff = require('diff');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const cron = require('node-cron');
require('dotenv').config();

class WebUpdateTracker {
    constructor(url, cronSchedule, emailConfig, waitSelector = null) {
        this.url = url;
        this.cronSchedule = cronSchedule;
        this.emailConfig = emailConfig;
        this.waitSelector = waitSelector;
        this.previousContent = '';
        this.transporter = nodemailer.createTransport(emailConfig);
    }

    async initialize() {
        try {
            this.previousContent = await this.loadPreviousContent();
            if (!this.previousContent) {
                console.log('Aucun contenu précédent trouvé. Initialisation...');
                this.previousContent = await this.fetchContent();
                await this.savePreviousContent(this.previousContent);
            }
            console.log('Initialisation réussie.');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
        }
    }

    async fetchContent() {
        const browser = await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            executablePath: puppeteer.executablePath(),
        });
        try {
            const page = await browser.newPage();
            await page.goto(this.url, { waitUntil: 'networkidle0' });

            if (this.waitSelector) {
                await page.waitForSelector(this.waitSelector, { timeout: 30000 });
            }

            return await page.content();
        } finally {
            await browser.close();
        }
    }

    async checkForUpdates() {
        try {
            const currentContent = await this.fetchContent();
            const changes = diff.diffLines(this.previousContent, currentContent);
            const significantChanges = changes.filter(change => change.added || change.removed);

            if (significantChanges.length > 0) {
                console.log('Mise à jour détectée!');
                await this.notifyUser(changes);
                this.previousContent = currentContent;
                await this.savePreviousContent(currentContent);
            } else {
                console.log('Aucune mise à jour significative détectée.');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification des mises à jour:', error);
            await this.notifyError(error);
        }
    }

    async notifyUser(changes) {
        const changesHtml = changes.map(change => {
            const style = change.added ? 'color: green;' : change.removed ? 'color: red;' : 'color: black;';
            const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
            return `<span style="${style}">${prefix}${change.value}</span>`;
        }).join('<br>');

        const mailOptions = {
            from: this.emailConfig.auth.user,
            to: this.emailConfig.to,
            subject: `Mise à jour détectée sur ${this.url}`,
            html: `<p>Des mises à jour ont été détectées sur ${this.url}.</p><pre>${changesHtml}</pre>`
        };

        try {
            console.log('Envoi de l\'email avec les options:', mailOptions);
            await this.transporter.sendMail(mailOptions);
            console.log('Notification envoyée par e-mail.');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
    }

    async notifyError(error) {
        const mailOptions = {
            from: this.emailConfig.auth.user,
            to: this.emailConfig.to,
            subject: `Erreur lors de la vérification de ${this.url}`,
            text: `Une erreur s'est produite lors de la vérification de ${this.url}:\n${error.message}`
        };

        try {
            console.log('Envoi de l\'email d\'erreur avec les options:', mailOptions);
            await this.transporter.sendMail(mailOptions);
            console.log('Notification d\'erreur envoyée par e-mail.');
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'e-mail d\'erreur:', emailError);
        }
    }

    async loadPreviousContent() {
        try {
            return await fs.readFile('previous_content.html', 'utf8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                return ''; // Fichier non trouvé, retourner une chaîne vide
            }
            throw error;
        }
    }

    async savePreviousContent(content) {
        await fs.writeFile('previous_content.html', content, 'utf8');
    }

    start() {
        this.initialize().then(() => {
            cron.schedule(this.cronSchedule, () => this.checkForUpdates());
            console.log(`Suivi démarré pour ${this.url}`);
        });
    }
}

// Configuration et utilisation
const url = process.env.WEBSITE_URL || 'https://talentpro.itmafrica.com/fr';
const cronSchedule = process.env.CRON_SCHEDULE || '*/15 * * * *'; // Toutes les 15 minutes par défaut
const emailConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    to: process.env.EMAIL_TO
};

// Attendre un sélecteur spécifique pour les sites utilisant des frameworks JavaScript dynamiques
const waitSelector = process.env.WAIT_SELECTOR || null;

const tracker = new WebUpdateTracker(url, cronSchedule, emailConfig, waitSelector);
tracker.start();

const Site = require("../models/sites.model");

class SitesRepository {
    async createSite(url) {
        try {
            return await Site.create({url});
        } catch (e) {

        }
    }

    async getSites(url) {
        try {
            return await Site.findOne({where: {url}});
        } catch (e) {
            throw e
        }
    }

    async updateSite(url, body) {
        try {
            return await Site.update(body, {where: {url}});
        } catch (e) {
            throw e;
        }
    }

    async updateStatusSite(url, status) {
        try {
            return await Site.update({status}, {where: {url}});
        } catch (e) {
            throw e
        }
    }
}

module.exports = new SitesRepository()

const DiabetesService = require("./diabetes.service");
const GoogleService = require("./google.service");
const KidneyService = require("./kidney.service");

class SiteFactory {
    createClass(command, data) {
        switch (command) {
            case "diabetes":
                return new DiabetesService().crawlDiabetesSite(data);
            case "google":
                return new GoogleService().crawlGoogleSite(data);
            case "kidney":
                return new KidneyService().crawlKidneySite(data);
            default:
                throw new Error("Command not found")
        }
    }
}

module.exports = new SiteFactory();

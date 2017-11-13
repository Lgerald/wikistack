var Sequelize = require("sequelize");
var db = new Sequelize("postgres://localhost:5432/wikistack", {logging: false}); //connects sequelize to current running bd

var Page = db.define("page", {
    title: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { 
            isUrl: true // note to self: did not do in the solution (is this something that could cause problems in the future????)
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("open", "closed")
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    }
});
    // route: {
    //     type: Sequelize.VIRTUAL,
    //     function () {
    //         return "/wiki/" + this.urlTitle;
    //     }
    // }
//});

var User = db.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            isEmail: true
        }
    }
});


module.exports = {
    db: db
    // Page: Page,
    // User: User
};
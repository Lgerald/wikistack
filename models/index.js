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
            //isUrl: true // note to self: did not do in the solution (is this something that could cause problems in the future????)
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
    }, 
    hooks: {
        beforeValidate: function generateUrlTitle(page) {
            if (page.title) {
                // Removes all non-alphanumeric characters from title
                // And make whitespace underscore
                //console.log(title);
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                // Generates random 5 letter string
                page.urlTitle = Math.random().toString(36).substring(2, 7);
            }
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
    db: db,
    Page: Page,
    User: User
};
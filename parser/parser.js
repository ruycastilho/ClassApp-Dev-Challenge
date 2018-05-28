// var csv = require('csv-parser');
// var csv = require("fast-csv");
var parse = require('csv-parse');
var fs = require("fs");
var path = require("path");
var _ = require('lodash');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;
var validator = require('validator');

function User(fullname, eid, classes, addresses, invisible, see_all) {
    this.fullname = fullname;
    this.eid = eid;
    this.classes = classes;
    this.addresses= addresses;
    this.invisible = invisible;
    this.see_all = see_all;
}

function Address(type, tags, address) {
    this.type = type;
    this.tags = tags;
    this.address = address;
}

function Column(type, tags) {
    this.type = type;
    this.tags = tags;

}

var output = [];
var columns = [];
var mainHeaderList;

fs.readFile('input.csv', function (err, fileData) {
    parse(fileData, function(err, rows) {
        // console.log(rows);

        var headerList = _.chunk(_.head(rows), 1);
        // console.log(headerList);

        var data_rows = _.drop(rows);
        // console.log(data_rows);

        var tokenized;
        var tags;
        var type;
        var body;

        for(i=0; i < headerList.length ; i++) {
            tags = [];
            tokenized = headerList[i].toString().replace(/,/g, '').split(" ");
            type = _.head(tokenized);
            body = _.drop(tokenized);

            for(k=0; k < body.length; k++) {
                // console.log("hey: " + body[k]);

                tags.push(body[k]);

            }

            columns.push(new Column(type, tags));
        }

        console.log(columns);

        // var found_user;
        // var user_index;
        var name;
        var id;
        var classes = [];
        var addresses = [];
        var invisible_input;
        var invisible;
        var see_all_input;
        var see_all;
        var data_list;
        var tokenized_classes = [];
        var tokenized_emails = [];
        var phone_number;
        var parsed_number;
        for(i=0; i < data_rows.length ; i++) {
            // console.log(data_rows[i]);
            data_list = _.chunk(data_rows[i], 1);
            for(j=0; j < data_rows[i].length ; j++) {

                switch ( columns[j].type ) {

                    case 'fullname':
                        name = data_list[j].toString();
                        break;
                    case 'eid':
                        id = data_list[j].toString();
                        break;
                    case 'invisible':
                        invisible_input = data_list[j].toString();
                        if (invisible_input == "" || invisible_input == "0" || invisible_input == "no") {
                            invisible = false;
                        }
                        else {
                            invisible = true;

                        }
                        break;
                    case 'see all':
                        see_all_input = data_list[j].toString();
                        if (see_all_input == "" || see_all_input == "0" || see_all_input == "no") {
                            see_all = false;
                        }
                        else {
                            see_all = true;

                        }
                        break;
                    case 'class':
                        tokenized_classes = _.chunk(data_list[j].toString().replace('/', ',').split(","), 1);
                        tokenized_classes.map(function(tok_class) { return tok_class.toString().trim() });

                        // for(k=0; k < tokenized_classes.length; k++) {
                        //     console.log("class to add: " + tokenized_classes[k]);
                        // }                        
                        break;
                    case 'phone':
                        phone_number = data_list[j].toString().trim();
                        console.log("phone: " + phone_number);
                        
                        try {
                            parsed_number = phoneUtil.parse(phone_number, 'BR');

                        }
                        catch (phone_err) {
                            break;
                        }

                        if ( phoneUtil.isValidNumber(parsed_number) ) {
                            console.log("parsed: " + phoneUtil.format(parsed_number, PNF.E164).replace("+", ""));
                            // addresses.push(new Address(columns[j].type, columns[j].tags, phoneUtil.format(parsed_number, PNF.E164).replace("+", "")));

                        }
                        break;
                        
                    case 'email':
                        tokenized_emails = data_list[j].toString().replace('/', ',').split(",");
                        tokenized_emails.map(function(tok_email) { return tok_email.toString().trim() });

                        tokenized_emails.filter(function (email) {
                            return validator.isEmail(email);
                        });
                        console.log("Valid emails:" + tokenized_emails);

                        for(k=0; k < tokenized_emails.length; k++) {
                            // console.log("email to add: " + tokenized_emails[k]);
                            addresses.push(new Address(columns[j].type, columns[j].tags, tokenized_emails[k]));
                        }
                        // tokenized_emails.forEach(addresses.push(new Address(columns[j].type, columns[j].tags, ));
                        break;
                    
                }
            }
        }

    })
})

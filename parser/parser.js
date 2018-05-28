// var csv = require('csv-parser');
// var csv = require("fast-csv");
var parse = require('csv-parse');
var transform = require('stream-transform');
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

        // console.log(columns);
        // var found_user;
        var user_index,
            name,
            id,
            classes = [],
            addresses = [],
            invisible_input,
            invisible,
            see_all_input,
            see_all,
            data_list,
            tokenized_classes = [],
            tokenized_emails = [],
            phone_number,
            parsed_number;

        for(i=0; i < data_rows.length ; i++) {
            // console.log(data_rows[i]);
            data_list = _.chunk(data_rows[i], 1);
            classes.splice(0, classes.length);
            addresses.splice(0, addresses.length);
            tokenized_classes.splice(0, tokenized_classes.length);
            tokenized_emails.splice(0, tokenized_emails.length);

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
                    case 'see_all':
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
                        // tokenized_classes.map(function(tok_class) { return tok_class.toString().trim() });

                        for(k=0; k < tokenized_classes.length; k++) {
                            // console.log("class to add: " + tokenized_classes[k]);
                            if (tokenized_classes[k].toString() != "") {
                                classes.push(tokenized_classes[k].toString().trim());

                            }

                        }                 
 
                        break;
                    case 'phone':
                        phone_number = data_list[j].toString().trim();
                        // console.log("phone: " + phone_number);
                        
                        try {
                            parsed_number = phoneUtil.parse(phone_number, 'BR');

                        }
                        catch (phone_err) {
                            break;
                        }

                        if ( phoneUtil.isValidNumber(parsed_number) ) {
                            // console.log("parsed: " + phoneUtil.format(parsed_number, PNF.E164).replace("+", ""));
                            var index = addresses.findIndex( function (addr) {
                                return addr.address == phone_number && addr.type == 'phone'
                            });
                            if (index != -1) {
                                addresses[index].tags.push.apply(addresses[index].tags, columns[j].tags.spice());
                            }
                            else {
                                addresses.push(new Address(columns[j].type, columns[j].tags.slice(), phoneUtil.format(parsed_number, PNF.E164).replace("+", "")));
                            }

                        }
                        break;
                        
                    case 'email':
                        tokenized_emails = _.chunk(data_list[j].toString().replace('/', ',').split(","), 1);
                        tokenized_emails.map(function(tok_email) { return tok_email.toString().trim() });
                        // for(k=0; k < tokenized_emails.length; k++) {
                        //     console.log("trimmed:'" + tokenized_emails[k].toString() + "'");
                        // }

                        for(k=0; k < tokenized_emails.length; k++) {
                            if (validator.isEmail(tokenized_emails[k].toString()) ) {
                                // console.log("email to add: " + tokenized_emails[k].toString());
                                // console.log("column tags:" + columns[j].tags);

                                // var test = addresses.findIndex( function (addr) {
                                //     return addr.address == "johndoemae1@gmail.com";

                                    
                                // });
                                // console.log("mae tags:" + addresses[test]);

                                var index = addresses.findIndex( function (addr) {
                                    return addr.address == tokenized_emails[k] && addr.type == 'email'
                                });
                                if (index != -1) {
                                    // console.log("curr tags:" + addresses[index].tags + '\ntags:' + columns[j].tags.slice());
                                    addresses[index].tags.push.apply(addresses[index].tags, columns[j].tags.slice());
                                    // console.log("curr tags:" + addresses[index].tags);

                                }
                                else {
                
                                    addresses.push(new Address(columns[j].type, columns[j].tags.slice(), tokenized_emails[k].toString()));
        
                                }
                            }
                        }
                        // tokenized_emails.forEach(addresses.push(new Address(columns[j].type, columns[j].tags, ));
                        break;
                    
                }

            }
            // for(k=0; k < classes.length; k++) {
            //     console.log("classes:'" + classes[k] + "'");

            // }
            // console.log("\n");
            // console.log("\naddresses:");
            // for(k=0; k < addresses.length; k++) {
            //     console.log("\naddress:\ntype:'" + addresses[k].type  + "'" + "\ntags:" + addresses[k].tags + "\naddr:" + addresses[k].address );

            // }
            
            // console.log("\n");
            user_index = output.findIndex( function (user) {
                return user.eid == id;
            });
            // console.log("'\nid:'" + id + "'");

            if (user_index != -1) {
                // console.log("User id:'" + output[user_index].eid + "'\nid:'" + id + "'\n");
                // for(k=0; k < classes.length; k++) {
                //     console.log("classes:'" + classes[k] + "'");
    
                // }
                // console.log("\n");

                // for(k=0; k < output[user_index].classes.length; k++) {
                //     console.log("curr classes:'" + output[user_index].classes[k] + "'");
    
                // }
                // console.log("\naddresses:");
                // for(k=0; k < addresses.length; k++) {
                //     console.log("\naddress:\ntype:'" + addresses[k].type  + "'" + "\ntags:" + addresses[k].tags + "\naddr:" + addresses[k].address );
    
                // }
                
                // console.log("\n");
                // console.log("\ncurr addresses:");
                // for(k=0; k <  output[user_index].addresses.length; k++) {
                //     console.log("\naddress:\ntype:'" +  output[user_index].addresses[k].type  + "'" + "\ntags:" + output[user_index].addresses[k].tags + "\naddr:" +  output[user_index].addresses[k].address );
    
                // }
                output[user_index].addresses.push.apply(output[user_index].addresses, addresses.slice());
                output[user_index].classes.push.apply(output[user_index].classes, classes.slice());
                output[user_index].invisible = output[user_index].invisible || invisible;
                output[user_index].see_all = output[user_index].see_all ||see_all;
            }
            else {
                output.push(new User(name, id, classes.slice(), addresses.slice(), invisible, see_all));
            }
            // console.log("\nData:");
            // console.log("fullname:'" + name + "'");
            // console.log("id:'" + id + "'");
            // console.log("invisible:'" + invisible + "'");
            // console.log("see_all:'" + see_all + "'\n");
            // for(k=0; k < classes.length; k++) {
            //     console.log("classes:'" + classes[k] + "'");

            // }
            // console.log("\naddresses:");
            // for(k=0; k < addresses.length; k++) {
            //     console.log("\naddress:\ntype:'" + addresses[k].type  + "'" + "\ntags:" + addresses[k].tags + "\naddr:" + addresses[k].address );

            // }
            // console.log("\n");
        }
        // var outputJSON = transform(output, function(data){
        //     data.push(data.shift())
        //   return data;
        // });
        var outputJSON = JSON.stringify(output, null, 2);
        console.log(outputJSON);
    });

})

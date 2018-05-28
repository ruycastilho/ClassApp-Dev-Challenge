// var csv = require('csv-parser');
// var csv = require("fast-csv");
var parse = require('csv-parse');
var fs = require("fs");
var path = require("path");
var _ = require('lodash');

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

        var found_user;
        var id;
        var user_index;
        for(i=0; i < data_rows.length ; i++) {
            found_user = false;
            id = data_rows[i].

        }
 

        for(i=0; i < output.length && found_user == false; i++) {
            if (output[i].eid == id) {
                found_user = true;
                user_index = i;
            }

        }

        if (found_user) {
            output[user_index].classes.push(row);



        }
        else {



        }
        
        console.log(data_rows);

    })
})


// var stream = fs.createReadStream('input.csv')
//     .pipe(csv())
//     .on('headers', function (headerList) {
//         mainHeaderList = headerList;
//         var list = _.chunk(headerList, 1);
        // var tokenized;
        // var tags;
        // var type;
        // var body;

        // for(i=0; i < list.length ; i++) {
        //     tags = [];
        //     tokenized = list[i].toString().replace(/,/g, '').split(" ");
        //     type = _.head(tokenized);
        //     body = _.drop(tokenized);

        //     for(k=0; k < body.length; k++) {
        //         console.log("hey: " + body[k]);

        //         tags.push(body[k]);

        //     }

        //     columns.push(new Column(type, tags));
        // }

//         console.log(columns);

//     })
//     .on('data', function (row) {
//         // var found_user = false;
//         // var id = row.eid;
//         // var user_index;
//         // for(i=0; i < output.length && found_user == false; i++) {
//         //     if (output[i].eid == id) {
//         //         found_user = true;
//         //         user_index = i;
//         //     }

//         // }

//         // if (found_user) {
//         //     output[user_index].classes.push(row);



//         // }
//         // else {



//         // }
//         console.log(row);



//     })
//     .on('end', function () {
//         // We are done
// })
/**
 * Created by frank-Z on 2016/9/18.
 */
var fs = require('fs');
var path = require('path');
var FILE_DB_DIR = path.normalize(process.cwd() + "/file-db/");

module.exports = FileDB;

function FileDB(fileName) {
    this.filename = fileName + '.json';
    this.path = FILE_DB_DIR + this.filename;
}

FileDB.prototype.get = function (opts, cb) {
    //console.log("222222222")
    var self = this;
    self.read(function (err, data) {
        if (err) cb("error", null);
        //console.log("data : "+data)
        //console.log(Object.prototype.toString.call(data));
        var arr = [];
        data.forEach(function (ele) {
            var outer = ele;
            //console.log("outer : "+outer);
            var bol = Object.keys(opts).every(function (elem, index, arr) {
                var inner = elem;
                return opts[inner] === outer[inner];
            });
            if (bol) {
                arr.push(outer);
            }
        });
        //console.log("arr : "+arr)
        cb(null, arr);
    })
};

FileDB.prototype.save = function (mes, cb) {
    if (!mes) {
        cb("error", null)
    }
    var self = this;
    self.read(function (err, data) {
        if (err) throw cb("error", null);

        data.push(mes);
        fs.writeFile(self.path, JSON.stringify(data), function (err, res) {
            cb(null, res)
        })
    })
};

FileDB.prototype.read = function (cb) {
    var self = this;
    fs.exists(self.path, function (exist) {
        if (exist) {
            fs.readFile(self.path, function (err, data) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, JSON.parse(data))
                }
            })
        }
        else {
            //console.log("path" + self.path)
            fs.appendFile(self.path, "[]", function (err, res) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, [])
                }
            })
        }
    })
}

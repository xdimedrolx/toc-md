var fs = require('fs'),
    toc = require('../../lib/index');

function readFiles(f) {
    var files = {};

    files.md = fs.readFileSync('test/toc/fixtures/md/' + f + '.md', 'utf-8');
    files['md-toc'] = fs.readFileSync('test/toc/fixtures/md-toc/' + f + '.md', 'utf-8');

    return files;
}

describe('TOC generation', function () {
    it('must generate a simple TOC', function (done) {
        var files = readFiles('simple');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must not generate a TOC', function (done) {
        var files = readFiles('no-toc');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must generate a TOC with duplicate headers\' names', function (done) {
        var files = readFiles('duplicate');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must work \'ignoreFirstHeader\' option', function (done) {
        var files = readFiles('ignore-first-header');

        toc(files.md, { ignoreFirstHeader: true }, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must work \'maxDepth\' option', function (done) {
        var files = readFiles('max-depth');

        toc(files.md, { maxDepth: 3 }, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must handle headers with \'special characters\'', function (done) {
        var files = readFiles('special-characters');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });

    it('must handle invalid structure of headers', function (done) {
        var files = readFiles('invalid-structure');

        toc(files.md, function (err, res) {
            if (err) {
                done(err);
            } else {
                res.must.be.equal(files['md-toc']);
                done();
            }
        });
    });
});
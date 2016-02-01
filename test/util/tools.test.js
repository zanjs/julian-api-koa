var should = require("should");
var tools = require('../../server/util/tools');

describe('test/util/tools.js',function () {

	describe('randomString',function () {
		it('should return 12 length string',function () {
			var nickname = tools.randomString();
			nickname.should.be.String();
			nickname.length.should.be.equal(12);
		});
		it('should return 6 length string',function () {
			var nickname = tools.randomString(6);
			nickname.should.be.String();
			nickname.length.should.be.equal(6);
		});
	});
	describe('extractImage', function() {
		it('should return images',function () {
			var content = '![enter image description here](http://zanjs.b0.upaiyun.com/image/7/72/573c59b06d8ab419bb2472bf5766f.jpg "enter image title here")';
			var images = tools.extractImage(content);
      images.length.should.be.equal(1);
      images[0].url.should.be.equal('http://zanjs.b0.upaiyun.com/image/7/72/573c59b06d8ab419bb2472bf5766f.jpg');
		});

		it('should return images',function () {
			var content = 'enter image title here';
			var images = tools.extractImage(content);
      images.length.should.be.equal(0);
		});
	});
});
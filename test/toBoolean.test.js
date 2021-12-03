import assert from 'assert';
import toBoolean from '../toBoolean';

describe.only('toBoolean', function() {
    describe('when passing String', function() {
        describe('when passing a empty string', function() {

            it('should return false', function() {
                assert.equal(false, toBoolean(''));
            });
            
        })
        describe('when passing a string with value', function() {
                
            it('should return true', function() {
                assert.equal(true, toBoolean('foo'));
            });
                
        })
    }),

    describe('when passing Number', function() {
        describe('when passing a 0', function() {

            it('should return false', function() {
                assert.equal(false, toBoolean(0));
            });
            
        })
        describe('when passing a 1', function() {
                
            it('should return true', function() {
                assert.equal(true, toBoolean(1));
            });
                
        })
    })
    describe('when passing Object', function() {
        it('should return true', function() {
            assert.equal(true, toBoolean({}));
        })
    })
    describe('when passing Array', function() {
        it('should return true', function() {
            assert.equal(true, toBoolean([]));
        })
    })
    describe('when passing Function', function() {
        it('should return true', function() {
            assert.equal(true, toBoolean(function(){}));
        })
    })
    describe('when passing Boolean', function() {
        describe('when passing true', function() {
            it('should return true', function() {
                assert.equal(true, toBoolean(true));
            })
        })
        describe('when passing false', function() {
            it('should return false', function(){
                assert.equal(false,toBoolean(false));
            })
        })
    })
    describe('when passing Null', function() {
        it('should return false', function() {
            assert.equal(false, toBoolean(null));
        })
    })
    describe('when passing undefined', function() {
        it('should return false', function() {
            assert.equal(false, toBoolean(undefined));
        })
    })
    describe('when passing NaN', function() {
        it('should return false', function() {
            assert.equal(false, toBoolean(NaN));
        })
    })
    describe('when passing Symbol', function() {
        it('should return true', function() {
            assert.equal(true, toBoolean(Symbol()));
        })
    })
})
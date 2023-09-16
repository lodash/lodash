import assert from 'node:assert';
import lodashStable from 'lodash';
import runInContext from '../src/runInContext';
import uniqueId from '../src/uniqueId';

describe('runInContext', () => {
    it('should not require a fully populated `context` object', () => {
        const lodash = runInContext({
            setTimeout: function (func) {
                func();
            },
        });

        let pass = false;
        lodash.delay(() => {
            pass = true;
        }, 32);
        assert.ok(pass);
    });

    it('should use a zeroed `_.uniqueId` counter', () => {
        lodashStable.times(2, uniqueId);

        const oldId = Number(uniqueId()),
            lodash = runInContext();

        assert.ok(uniqueId() > oldId);

        const id = lodash.uniqueId();
        assert.strictEqual(id, '1');
        assert.ok(id < oldId);
    });
});

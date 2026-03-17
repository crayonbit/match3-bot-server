"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitStepIterators = awaitStepIterators;
function* awaitStepIterators(params) {
    const { settledCheckTicksInterval, onTickStart, onStepEnter, onStepExit, onTickEnd } = params;
    let { stepIterators } = params;
    let tickCounter = 0;
    let waitingIteratorName = null;
    let ticksToWait = 0;
    while (stepIterators.length > 0) {
        onTickStart(tickCounter);
        if (ticksToWait-- > 0) {
            onTickEnd(tickCounter);
            tickCounter++;
            yield { kind: 'tickEnd' };
            continue;
        }
        const updatedIterators = [];
        const isSettledCheckTime = tickCounter % settledCheckTicksInterval === 0;
        let currentIteratorValue = { kind: 'stepDebug' };
        for (const stepIterator of stepIterators) {
            const isOtherIteratorWaiting = !!waitingIteratorName && waitingIteratorName !== stepIterator.name;
            if (isOtherIteratorWaiting || !stepIterator.isTimeToTick(tickCounter)) {
                updatedIterators.push(stepIterator);
                continue;
            }
            waitingIteratorName = null;
            onStepEnter(stepIterator.name);
            let isIteratorDone = false;
            do {
                const { value = { kind: 'step' }, done = false } = stepIterator.iterator.next();
                const stepResult = value;
                currentIteratorValue = stepResult;
                isIteratorDone = done;
                if (isIteratorDone)
                    break;
                if (stepResult.kind === 'tickWait') {
                    waitingIteratorName = stepIterator.name;
                    ticksToWait = stepResult.ticks;
                    yield currentIteratorValue;
                    break;
                }
                yield currentIteratorValue;
            } while (!['stepEnd'].includes(currentIteratorValue.kind));
            onStepExit(stepIterator.name, stepIterator.isSettled());
            if (!isIteratorDone)
                updatedIterators.push(stepIterator);
        }
        stepIterators = updatedIterators;
        currentIteratorValue = { kind: 'stepDebug' };
        onTickEnd(tickCounter);
        tickCounter++;
        const isAllSettled = isSettledCheckTime &&
            stepIterators.every((iterator) => {
                return iterator.isSettled();
            });
        if (isAllSettled) {
            return;
        }
        yield { kind: 'tickEnd' };
    }
}
//# sourceMappingURL=AwaitStepIterators.js.map
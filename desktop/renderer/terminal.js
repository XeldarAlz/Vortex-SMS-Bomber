const DEFAULT_MAX_LINES = 500;
const MAX_TIMEOUT_MS = 2147483647;

export function createTerminalScheduler(terminal, { maxLines = DEFAULT_MAX_LINES } = {}) {
    let seq = 0;
    let rafId = null;
    let timerId = null;
    let timerDue = null;
    const queue = [];

    function clearTimers() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        if (timerId !== null) {
            clearTimeout(timerId);
            timerId = null;
            timerDue = null;
        }
    }

    function insertEntry(entry) {
        if (queue.length === 0 || entry.due >= queue[queue.length - 1].due) {
            queue.push(entry);
            return;
        }
        
        let lo = 0;
        let hi = queue.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            const cmp = queue[mid].due - entry.due || queue[mid].seq - entry.seq;
            if (cmp <= 0) lo = mid + 1;
            else hi = mid;
        }
        queue.splice(lo, 0, entry);
    }

    function requestFlush() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(flushDue);
    }

    function scheduleNext() {
        if (queue.length === 0) {
            clearTimers();
            return;
        }

        const now = performance.now();
        const nextDue = queue[0].due;
        if (nextDue <= now) {
            if (timerId !== null) {
                clearTimeout(timerId);
                timerId = null;
                timerDue = null;
            }
            requestFlush();
            return;
        }

        if (timerId !== null && timerDue !== null && timerDue <= nextDue) return;
        if (timerId !== null) clearTimeout(timerId);

        const ms = Math.max(0, Math.min(MAX_TIMEOUT_MS, nextDue - now));
        timerDue = nextDue;
        timerId = setTimeout(() => {
            timerId = null;
            timerDue = null;
            requestFlush();
        }, ms);
    }

    function trimOverflow() {
        const overflow = terminal.childElementCount - maxLines;
        if (overflow <= 0) return;
        
        const range = document.createRange();
        range.setStartBefore(terminal.firstElementChild);
        range.setEndAfter(terminal.children[overflow - 1]);
        range.deleteContents();
    }

    function flushDue() {
        rafId = null;
        if (queue.length === 0) return;

        const now = performance.now();
        if (queue[0].due > now) {
            scheduleNext();
            return;
        }

        const frag = document.createDocumentFragment();
        const resolvers = [];

        while (queue.length > 0 && queue[0].due <= now) {
            const item = queue.shift();
            const div = document.createElement('div');
            div.className = 'term-line';
            div.innerHTML = item.html;
            frag.appendChild(div);
            resolvers.push(item.resolve);
        }

        terminal.appendChild(frag);
        trimOverflow();
        terminal.scrollTop = terminal.scrollHeight;
        
        for (let i = 0; i < resolvers.length; i++) {
            resolvers[i]();
        }

        scheduleNext();
    }

    return {
        clear() {
            clearTimers();
            queue.length = 0;
            terminal.replaceChildren();
        },
        enqueue(html, delayMs = 0) {
            const due = performance.now() + Math.max(0, Number(delayMs) || 0);
            return new Promise(resolve => {
                insertEntry({ seq: ++seq, due, html: String(html ?? ''), resolve });
                scheduleNext();
            });
        },
        updateLastLine(html) {
            if (terminal.lastElementChild) {
                terminal.lastElementChild.innerHTML = String(html ?? '');
            }
        }
    };
}

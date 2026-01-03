export function createStats({ dom, getTargetAmount, getStats }) {
    let rafId = null;

    function updateNow() {
        const stats = getStats();
        const targetAmount = getTargetAmount();

        dom.statTotal.textContent = stats.total;
        dom.statSuccess.textContent = stats.success;
        dom.statFailed.textContent = stats.error;

        const rate = stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(1) : '0.0';
        dom.statRate.textContent = rate + '%';

        const progress = targetAmount > 0 ? (stats.success / targetAmount) * 100 : 0;
        dom.progressBar.style.width = Math.min(progress, 100) + '%';
        dom.progressText.textContent = Math.round(progress) + '%';
    }

    function update() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            updateNow();
        });
    }

    return { update, updateNow };
}


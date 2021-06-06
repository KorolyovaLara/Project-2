
module.exports = {

    get_avatar: () => {
        const randomNum = Math.random();
        let icon = "🎮";

        if (randomNum > 0.7) {
            icon = "🕹️";
        } else if (randomNum < 0.4) {
            icon = "👾";
        }
        return `<span for="img" aria-label="icon">${icon}</span>`;
    }
};
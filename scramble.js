let alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export function scramble(element, text = '', character_changes = 5, delay = 50, charset = alpha) {
    element.textContent = ''
    let shifts = 0
    let cycle = setInterval(() => {
        let len = element.textContent.length
        let suf = ''
        if (shifts==character_changes) {
            if (len==text.length){clearInterval(cycle)}
            else {len++}
            shifts = 0
        }
        else {
            len--
            suf = charset[Math.floor(Math.random()*charset.length)]
        }
        element.textContent = text.substring(0,len) + suf
        shifts++
    }, delay);
    return cycle
}
export function timedScramble(element, text, character_changes, time, charset = alpha) {
    let delay = (time*1000) / (text.length*character_changes)
    scramble(element, text, character_changes, delay, charset)
}
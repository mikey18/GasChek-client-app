var mode = JSON.parse(localStorage.getItem('gd*******'));
var metaThemeColor = document.querySelector("meta[name='theme-color']");
var dark = 'dark-mode';
var light = 'light-mode';
if (mode) {
    metaThemeColor.content = '#0f0f0f';
    document.body.classList.add(dark);
    document.body.classList.remove(light);
} else {
    metaThemeColor.content = '#ffffff';
    document.body.classList.add(light);
    document.body.classList.remove(dark);
}

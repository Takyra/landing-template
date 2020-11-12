function previousPage(buttonClass) {
    let returnButton = document.querySelectorAll(buttonClass);

    for (let i = 0; i < returnButton.length; i++) {
        returnButton[i].onclick = function() {
            history.back();
        }
    }
}
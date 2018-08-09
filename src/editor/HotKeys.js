if(typeof(window) !== 'undefined') {
    const onKeyPress = e => {
        console.log(e);
    }
    
    window.addEventListener('keypress', onKeyPress);
}

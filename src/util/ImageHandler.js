const ImageHandler = {
    loadImageToSprite: (file, sprite) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const base64 = fileReader.result;
          window.game.load.image(file.name, base64);
          window.game.load.onLoadComplete.add(() => {
            sprite.loadTexture(file.name);
            window.game.load.onLoadComplete.removeAll();
          }, this);
          window.game.load.start();
        };
    }
}

export default ImageHandler;
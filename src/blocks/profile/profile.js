const avatarLoader = document.querySelector('.avatar-loader');

if (avatarLoader) {
    const avatar = avatarLoader.querySelector('.avatar-loader__avatar');
    const inputFile = avatarLoader.querySelector('input');

    inputFile.addEventListener('change', (event) => {
        if (event.target.files[0]) {
            let imageSrc = URL.createObjectURL(event.target.files[0]);
            avatar.style.backgroundImage = `url(${imageSrc})`;
        }
    });
}

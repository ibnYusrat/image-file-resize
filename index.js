module.exports = function({ file, width, height, type }) {
    return new Promise(function (resolve, reject) {
        let allow = ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'svg'];
        try {
            if (file.name && file.name.split(".").reverse()[0] && allow.includes(file.name.split(".").reverse()[0].toLowerCase()) && file.size && file.type) {
                let imageType = type ? type : 'jpeg';
                const imgWidth = width ? width : 'auto';
                const imgHeight = height ? height : 'auto';
                if (imgWidth === 'auto' && imgHeight === 'auto') {
                    throw new Error('Please define width or height');
                }
                const fileName = file.name;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = event => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        const elem = document.createElement('canvas');
                        // Set propotional image size
                        if (imgWidth !== 'auto' && imgHeight !== 'auto') {
                            elem.width = imgWidth;
                            elem.height = imgHeight;
                        } else if (imgWidth !== 'auto') {
                            elem.width = imgWidth;
                            elem.height = img.height * (imgWidth / img.width);
                        } else if (imgHeight !== 'auto') {
                            elem.height = imgHeight;
                            elem.width = img.width * (imgHeight / img.height);
                        }
                        const ctx = elem.getContext('2d');
                        ctx.drawImage(img, 0, 0, elem.width, elem.height);
                        ctx.canvas.toBlob((blob) => {
                            const file = new File([blob], fileName, {
                                type: `image/${imageType.toLowerCase()}`,
                                lastModified: Date.now()
                            });
                            resolve(file)
                        }, 'image/jpeg', 1);
                    }, reader.onerror = error => reject(error);
                };
            } else reject('File not supported!')
        } catch (error) {
            console.log("Error while image resize: ", error);
            reject(error)
        }
    })
}
